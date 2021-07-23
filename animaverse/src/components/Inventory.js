import React, {useContext, useEffect} from 'react';
import Item from './Item';
import items from '../items/items'
import UserContext from '../users/UserContext'
import { v4 as uuidv4 } from 'uuid';
import './inventory.css';
import AnimalsApi from '../api'
import jwt from 'jsonwebtoken'

function Inventory(){
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
    const inventoryItems = currentUser.inventory.map(i=>{
        let currItem = items[i.item_id-1]
        return <Item key={uuidv4()} src={currItem.img} name={currItem.name} description={currItem.description} id={currItem.id} action={currItem.action} amount={currItem.amount} />
    })
    return(
        <div id='inventory'>
            {inventoryItems}
        </div>
    )
}

export default Inventory;