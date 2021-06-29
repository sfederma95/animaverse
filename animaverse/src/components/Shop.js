import React, {useState, useContext} from 'react';
import ShopItem from './ShopItem';
import items from '../items/items'
import AnimalsApi from '../api'
import UserContext from '../users/UserContext'
import Alert from '../Alert'
import {useHistory} from 'react-router-dom';

function Shop(){
    const history = useHistory();
    const [formErrors,setFormErrors] = useState([])
    const {currentUser} = useContext(UserContext)
    async function getItemId(e) {
        let itemId = e.target.parentNode.getAttribute('id');
        try {
            await AnimalsApi.buyItem({ item_id: itemId, usr_id: currentUser.usr_id }, currentUser.usr_id, items[itemId-1].price);
            alert(`${items[itemId-1].name} has been added to your inventory`);
            history.push(`/users/${currentUser.usr_id}`);
        } catch (e) {
            let errors = [e];
            setFormErrors(errors);
        }
    }
    const shopItems = items.map(i=>{
        return <ShopItem getItemId = {getItemId} key={i.id} id={i.id} price={i.price} src={i.img} action={i.action} amount={i.amount} name={i.name} description={i.description} />
    })
    return(
        <div>
            <h1>Welcome to the shop!</h1>
            <p>Buy items to play with and feed your pets!</p>
            {formErrors.length ? <Alert messages={formErrors}/> : null}
            {shopItems}
        </div>
    )
}

export default Shop;