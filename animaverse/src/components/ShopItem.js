import React from 'react';

function ShopItem({src,action,name,id,description,amount, price}){
    return(
        <div>
            <img alt={name} height="200px" width="200px" src={src}/>
            <p>Item Name: {name}</p>
            <p>Price: {price} Gold</p>
            <p>Description: {description}</p>
            <p>Increase: {amount} points</p>
            <button>Buy</button>
        </div>
    )
}

export default ShopItem;