import React, {useContext, useEffect} from 'react';
import UserContext from '../users/UserContext';
import Item from './Item';
import items from '../items/items';
import { v4 as uuidv4 } from 'uuid';
import AnimalsApi from '../api';
import jwt from 'jsonwebtoken';
import emoji from 'react-easy-emoji';

function InteractWindow({action, pet_id, petInfo, interaction}){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const token = AnimalsApi.token;
    useEffect(function(){
      function loadUserInfo(){
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
      }
      async function handleSelect(iid){
        let res1;
        let res2;
        let initialErr = false;
        if (action==='Feed') {
            res1 = await AnimalsApi.feedPet({ item_id: iid, amt: items[iid-1].amount }, currentUser.usr_id, pet_id);
            if (res1.errors) initialErr = true;
        } else {
            res2 = await AnimalsApi.playPet({ item_id: iid, amt: items[iid-1].amount }, currentUser.usr_id, pet_id);
            if (res2.errors) initialErr=true;
        }
        let res3 = await AnimalsApi.removeItem({ usr_id: currentUser.usr_id, item_id: iid })
        let res4 = await AnimalsApi.addExp({amt:10},pet_id, currentUser.usr_id)
        if(initialErr !== false || res3.errors || res4.errors){
            alert(`Looks like there was a problem, please try again`)
        }
        window.$(`#${pet_id}`).find('.loved').css('display','initial')
        interaction(false);
        petInfo(true);
        loadUserInfo();
    }
        window.$(".item-img").draggable({
            addClasses: false,
            drag: function(e){
              window.$(e.target).siblings('.counters').css('opacity','0%');
            }
          });
          window.$(".pet-img").droppable({
            accept: ".item-img",
            addClasses: false,
            drop: function(e,ui) {   
              let iid = window.$(ui.draggable[0]).parent().attr('id');
              handleSelect(+iid)
            }
          }); 
    },[action, currentUser.usr_id, pet_id, token, setCurrentUser, petInfo, interaction])
    const filteredInv = Object.keys(currentUser.items).filter(i=>{
        let currItem = items[i-1]
        return currItem.action === action
    })
    const inventoryItems = filteredInv.map(i=>{
        let currItem = items[i-1]
        return (
            <div key={uuidv4()}>
                <Item src={currItem.img} name={currItem.name} description={currItem.description} id={currItem.id} action={currItem.action} amount={currItem.amount} x={currentUser.items[i]} />
            </div>
        )
    })

    const back = () =>{
      interaction(false);
      petInfo(true);
    }

    return(
        <div id='interact-items'>
            <span onClick={back} role="img" aria-label="back" className='back-btn'>{emoji('⏎')}</span>
            {inventoryItems.length ? inventoryItems : <div className='empty-bag'>So Empty :(</div>}
        </div>

    )
}

export default InteractWindow;