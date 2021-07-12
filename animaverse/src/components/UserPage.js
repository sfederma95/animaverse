import React, {useContext, useEffect} from 'react';
import UserContext from '../users/UserContext';
import UserPet from './UserPet'
import {Link} from 'react-router-dom'
import AnimalsApi from '../api'
import jwt from 'jsonwebtoken'

function UserPage(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const token = AnimalsApi.token
    useEffect(function loadUserInfo(){
        async function getCurrentUser(){
          if(token) {
            try {
              let {id} = jwt.decode(token);
              AnimalsApi.token = token;
              let getUser = await AnimalsApi.getUser(id);
              setCurrentUser(getUser);
            } catch(err){
              setCurrentUser(null)
            }
          }
        }
        getCurrentUser();
      },[setCurrentUser, token])
    let userPets; 
    currentUser.pets ? userPets = currentUser.pets.map(p=>{
        return <UserPet petId={p.id} userId= {currentUser.usr_id} key={p.id} src={p.pet_img} name={p.pet_name} level={p.pet_lvl} happiness={p.happiness} hunger={p.hunger} exp={p.lvl_exp} status={p.pet_status} last_fed={p.last_fed === null ? 'N/A' : p.last_fed} last_play={p.last_play === null ? 'N/A' : p.last_fed} />
    }) : userPets = null;
    let letsAdopt;
    if (currentUser.pets){
      currentUser.pets.length < 2 ? letsAdopt = (
        <div>
            <p>You can have up to two pets. Click the button below to choose a pet.</p>
            <button>
                <Link to={`/${currentUser.usr_id}/adopt`}>Choose Pet</Link>
            </button>
        </div>
    ) : letsAdopt = null;
    }
    return(
        <div>
            <img alt="usr-avatar" src={currentUser.usr_avt} height="200px" width="200px"/>
            <h1>Welcome, {currentUser.username}!</h1>
            <p>Your gold: {currentUser.gold_amt}</p>
            <button>Update Account</button>
            {currentUser.pets ? letsAdopt : null}
            {currentUser.pets ? userPets : null}
        </div>
    )
}

export default UserPage;