import React, {useState} from 'react';

function Item({src,action,name,id,description,amount}){
    const [itemInfo, setItemInfo] = useState(null)
    const displayInfo = () => {
        setItemInfo(<div className='item-text'>
        <p><b>Item Name:</b> {name}</p>
        <p><b>Description:</b> {description}</p>
        <p><b>Effect:</b> {action==="Feed"? "Lower hunger" : "Increase happiness"} by {amount} points</p>
        </div>)
    }
    const hideInfo = () => {
        setItemInfo(null)
    }
    return(
        <div className='inv-item' id={id}>
            <img tabIndex="0" onBlur={hideInfo} onClick={displayInfo} className='item-img' alt={name} src={src}/>
            {itemInfo}
        </div>
    )
}

export default Item;