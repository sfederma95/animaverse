import React, {useState, useContext} from 'react';
import ShopItem from './ShopItem';
import items from '../items/items'
import AnimalsApi from '../api'
import UserContext from '../users/UserContext'
import Alert from '../Alert'
import './inventory.css';

function Shop(){
    const [formErrors,setFormErrors] = useState([])
    const {currentUser} = useContext(UserContext)
    async function getItemId(e) {
        if (currentUser.inventory.length <= 21){
            let itemId = e.target.parentNode.parentNode.getAttribute('id');
            let res = await AnimalsApi.buyItem({ item_id: +itemId, usr_id: currentUser.usr_id }, currentUser.usr_id, items[itemId-1].price);
            if (res.errors) {
                setFormErrors(res.errors)
            } else{
                alert(`${items[itemId-1].name} has been added to your inventory`);
            }
        }
        else {
            alert('Looks like your inventory is full, try using up some items')
        }
    }
    const shopItems = items.map(i=>{
        return <ShopItem getItemId = {getItemId} key={i.id} id={i.id} price={i.price} src={i.img} action={i.action} amount={i.amount} name={i.name} description={i.description} />
    })
    return(
        <div id='shop-container'>
            {formErrors.length ? <Alert messages={formErrors}/> : null}
            {shopItems}
        </div>
    )
}

export default Shop;