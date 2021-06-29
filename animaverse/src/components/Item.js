import React from 'react';

function Item({src,action,name,id,description,amount}){
    return(
        <div id={id}>
            <img height='200px' width='200px' alt={name} src={src}/>
            <p>Item Name: {name}</p>
            <p>Description: {description}</p>
            <p>Effect: {action==="Feed"? "Lower hunger" : "Increase happiness"} by {amount} points</p>
        </div>
    )
}

export default Item;