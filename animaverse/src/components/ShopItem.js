import React from 'react';

function ShopItem({src,name,id,description,amount, price, getItemId}){
    return(
        <div id={id}>
            <img alt={name} height="200px" width="200px" src={src}/>
            <p>Item Name: {name}</p>
            <p>Price: {price} Gold</p>
            <p>Description: {description}</p>
            <p>Increase: {amount} points</p>
            <button onClick={getItemId}>Buy</button>
        </div>
    )
}

export default ShopItem;