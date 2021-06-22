import React from 'react';

function Item({src,action,name,id,description,amount}){
    return(
        <div>
            <img alt={name} src={src}/>
            <p>Item Name: {name}</p>
            <p>Description: {description}</p>
            <p>Effect: {action==="Feed"? "Lower hunger" : "Increase happiness"} by {amount} points</p>
        </div>
    )
}

export default Item;