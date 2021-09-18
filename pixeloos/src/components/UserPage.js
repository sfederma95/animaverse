import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../users/UserContext';
import UserPet from './UserPet'
import {Link} from 'react-router-dom'
import './userpg.css';
import Inventory from './Inventory'
import backpack from './user-graphics/backpack.gif';
import coin from './user-graphics/coin.gif';
import scareCat from './user-graphics/scare-cat.gif';
import cancel from './user-graphics/cancel.png'
import './usr-pet.css';
import Shop from './Shop'
import AnimalsApi from '../api'
import jwt from 'jsonwebtoken'

function UserPage(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [inv, setInv] = useState(false)  
    const [pets, setPets] = useState(false)  
    const [overlay, setOverlay] = useState(false)
    const [shop, setShop] = useState(false)
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
        return <UserPet petId={p.id} userId= {currentUser.usr_id} key={p.id} src={p.pet_img} name={p.pet_name} level={p.pet_lvl} happiness={p.happiness} hunger={p.hunger} exp={p.lvl_exp} status={p.pet_status} last_fed={p.last_fed === null ? 'N/A' : p.last_fed} last_play={p.last_play === null ? 'N/A' : p.last_play} />
    }) : userPets = null;
    let letsAdopt;
    if (currentUser.pets){
      currentUser.pets.length < 2 ? letsAdopt = (
        <div id='lets-adopt'>
            <Link id='adopt-redirect' to={`/${currentUser.usr_id}/adopt`}>Choose Pet</Link>
        </div>
    ) : letsAdopt = null;
    }
    const hideMenu = () => {
      setInv(false);
      setOverlay(false);
      setPets(false);
      setShop(false);
      window.$('.loved').css('display','none');
    }
    const showInventory = () => {
      setInv(true);
      setOverlay(true)
    }
    const showPets = () => {
      setPets(true);
      setOverlay(true)
    }
    const showShop = () => {
      setShop(true);
      setOverlay(true)
    }
    return(
        <div>
            {overlay === true ? <div id='overlay'></div> : null}
            {overlay===true ? <img src={cancel} onClick={hideMenu} id='cancel-btn' alt='close-menu'/> : null}
            <div id='user-show'>
              <img alt="usr-avatar" id='usr-img' src={currentUser.usr_avt} height="200px" width="200px"/>
              <h1 id='welcome-line'>Welcome, {currentUser.username}!</h1>
              <div id='interact-icons'>
                <img src={backpack} alt='backpack-icon' onClick={showInventory} className='click-icons'/>
                <img src={coin} alt='coin-icon' onClick={showShop} className='click-icons'/>
                <img src={scareCat} alt='cat-icon' onClick={showPets} className='click-icons'/>
              </div>
              {currentUser.pets ? letsAdopt : null}
            </div>
            {pets===true && currentUser.pets ? (<div id='pets-collection'>{userPets}</div>) : null}
            {inv === true ? <Inventory /> : null}
            {shop === true ? <Shop /> : null}
        </div>
    )
}

export default UserPage;