import React from 'react';
import ShopItem from './ShopItem';
import items from '../items/items'

function Shop(){
    const shopItems = items.map(i=>{
        return <ShopItem price={i.price} src={i.img} action={i.action} amount={i.amount} name={i.name} description={i.description} />
    })
    return(
        <div>
            <h1>Welcome to the shop!</h1>
            <p>Buy items to play with and feed your pets!</p>
            {shopItems}
        </div>
    )
}

export default Shop;