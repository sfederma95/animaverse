import React, {useState,useEffect} from 'react';  
import Navbar from './nav/Navbar'
import Routes from './routes/Routes'
import {BrowserRouter} from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage';
import AnimalsApi from './api';
import UserContext from './users/UserContext'
import jwt from 'jsonwebtoken'
import './App.css'

function App() {
  const [currentUser,setCurrentUser]=useState(null);
  const [token,setToken] = useLocalStorage('user-token')
  function loadUserInfo(){
    async function getCurrentUser(){
      if(token) {
        try {
          let {id} = jwt.decode(token);
          AnimalsApi.token = token;
          let currentUser = await AnimalsApi.getUser(id);
          setCurrentUser(currentUser);
        } catch(err){
          setCurrentUser(null)
        }
      }
    }
    getCurrentUser();
  }
  useEffect(loadUserInfo,[token])
  async function register(data){
    try{
      let user = await AnimalsApi.register(data);
      let token = user.token
      setToken(token)
      setCurrentUser(user)
      return {register:true, user};
    } catch(msg){
      return {register: false, errors:[msg]}
    }
  }
  async function login(data){
    try{
      let user = await AnimalsApi.login(data);
      let token = user.token;
      setToken(token);
      setCurrentUser(user)
      return {login:true, user};
    } catch(msg) {
      return {login:false, errors:[msg]}
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
          <Routes login={login} register={register} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
