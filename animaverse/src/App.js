import React, {useState,useEffect} from 'react';
import Navbar from './nav/Navbar'
import Routes from './routes/Routes'
import {BrowserRouter} from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage';
import AnimalsApi from './api';
import UserContext from './users/UserContext'
import jwt from 'jsonwebtoken'

function App() {
  const [currentUser,setCurrentUser]=useState(null);
  const [token,setToken] = useLocalStorage('user-token')
  useEffect(function loadUserInfo(){
    async function getCurrentUser(){
      if(token) {
        try {
          let {usr_id} = jwt.decode(token);
          AnimalsApi.token = token;
          let currentUser = await AnimalsApi.getUser(usr_id);
          setCurrentUser(currentUser);
        } catch(err){
          setCurrentUser(null)
        }
      }
    }
    getCurrentUser();
  },[token])
  async function register(data){
    try{
      let user = await AnimalsApi.register(data);
      let token = user.token
      setToken(token)
      return true;
    } catch(errors){
      return {register: false, errors}
    }
  }
  async function login(data){
    try{
      let user = await AnimalsApi.login(data);
      let token = user.token;
      setToken(token);
      return true;
    } catch(errors) {
      return {login:false, errors}
    }
  }
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{currentUser,setCurrentUser}}>
        <div>
          <Navbar logout={logout}/>
          <Routes login={login} register={register}/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
