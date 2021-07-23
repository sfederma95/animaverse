import React, {useState} from 'react';
import $ from 'jquery';

function ShopItem({src,name,id,description,amount, price, getItemId}){
    const [itemInfo, setItemInfo] = useState(false)
    const displayInfo = () => {
        setItemInfo(true)
    }
    const hideInfo = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)){
            setItemInfo(false)
        }
    }
    return(
        <div tabIndex='0' onBlur={hideInfo} className='shop-item' id={id}>
            <img onClick={displayInfo}  alt={name} className='item-img' src={src}/>
            {itemInfo === true ? <div className='shop-text'>
                <p>Item Name: {name}</p>
                <p>Price: {price} Gold</p>
                <p>Description: {description}</p>
                <p>Increase: {amount} points</p>
                <button className='buy-btn' onClick={getItemId}>Buy</button>
            </div> : null}
        </div>
    )
}

export default ShopItem;