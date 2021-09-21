import React, {useContext} from 'react';
import ShopItem from './ShopItem';
import items from '../items/items'
import AnimalsApi from '../api'
import UserContext from '../users/UserContext'
import './inventory.css';
import jwt from 'jsonwebtoken'

function Shop(){
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const token = AnimalsApi.token;
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
    async function getItemId(e) {
      let itemId = e.target.parentNode.parentNode.getAttribute('id');
      let res = await AnimalsApi.buyItem({ item_id: +itemId, usr_id: currentUser.usr_id }, currentUser.usr_id, items[itemId-1].price);
      if (res.errors) {
        alert("Looks like there was a problem, try again");
      } else{
        loadUserInfo();
      }
    }
    const shopItems = items.map(i=>{
        return <ShopItem userGold = {currentUser.gold_amt} getItemId = {getItemId} key={i.id} id={i.id} price={i.price} src={i.img} action={i.action} amount={i.amount} name={i.name} description={i.description} />
    })
    return(
        <div id='shop-container'>
            {shopItems}
        </div>
    )
}

export default Shop;