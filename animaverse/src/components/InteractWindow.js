import React, {useContext, useState} from 'react';
import UserContext from '../users/UserContext'
import {useParams, useHistory} from 'react-router-dom'
import Item from './Item';
import items from '../items/items'
import { v4 as uuidv4 } from 'uuid';
import AnimalsApi from '../api'
import Alert from '../Alert'

function InteractWindow({action}){
    let history = useHistory();
    const [formErrors,setFormErrors] = useState([])
    const {currentUser} = useContext(UserContext)
    const {pet_id} = useParams()
    const currPet = currentUser.pets.find(p=>p.id===+pet_id)
    const filteredInv = currentUser.inventory.filter(i=>{
        let currItem = items[i.item_id-1]
        return currItem.action === action
    })
    async function handleSelect(e){
        let itemId = e.target.getAttribute('id')
        try {
            let msg;
            if (action==='Feed') {
                msg=`${currPet.pet_name} is happy to see you, thanks for feeding them`
                await AnimalsApi.feedPet({ item_id: itemId, amt: items[itemId-1].amount }, currentUser.usr_id, pet_id);
            } else {
                msg=`${currPet.pet_name} is happy to see you, thanks for playing with them`
                await AnimalsApi.playPet({ item_id: itemId, amt: items[itemId-1].amount }, currentUser.usr_id, pet_id);
            }
            await AnimalsApi.removeItem({ usr_id: currentUser.usr_id, item_id: itemId })
            alert(msg);
            history.push(`/users/${currentUser.usr_id}`);
        } catch (e) {
            let errors = [e];
            setFormErrors(errors);
        }
    }
    const inventoryItems = filteredInv.map(i=>{
        let currItem = items[i.item_id-1]
        return (
            <div key={uuidv4()}>
                <Item src={currItem.img} name={currItem.name} description={currItem.description} id={currItem.id} action={currItem.action} amount={currItem.amount} />
                <button onClick={handleSelect} id={currItem.id}>Select</button>
            </div>
        )
    })
    return(
        <div>
            {formErrors.length ? <Alert messages={formErrors}/> : null}
            <img alt={currPet.pet_name} height="200px" width="200px" src={currPet.pet_img}/>
            <p>{currPet.pet_name}</p>
            <p>Hunger: {currPet.hunger}</p>
            <p>Happiness: {currPet.happiness}</p>
            <p><b>Keep in mind that all items are one-time use.</b></p>
            <div>
                {inventoryItems}
            </div>
        </div>

    )
}

export default InteractWindow;