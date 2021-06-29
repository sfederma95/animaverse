import React from 'react'

function Card({image, code}){
    return(
        <img src={image} alt={code} key={code}/>
    )
}

export default Card;