import React from 'react'

function Card({className, image, code}){
    return(
        <img src={image} alt={className} key={code} className={className}/>
    )
}

export default Card;