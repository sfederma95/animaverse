import React, {useContext} from 'react';
import Item from './Item';
import items from '../items/items'
import UserContext from '../users/UserContext'
import { v4 as uuidv4 } from 'uuid';

function Inventory(){
    const {currentUser} = useContext(UserContext)
    const inventoryItems = currentUser.inventory.map(i=>{
        let currItem = items[i.item_id-1]
        return <Item key={uuidv4()} src={currItem.img} name={currItem.name} description={currItem.description} id={currItem.id} action={currItem.action} amount={currItem.amount} />
    })
    return(
        <div>
            <h1>{currentUser.username}'s inventory</h1>
            <p>Check out the items in your inventory</p>
            {inventoryItems}
        </div>
    )
}

export default Inventory;