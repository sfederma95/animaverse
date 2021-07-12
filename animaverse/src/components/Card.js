import React from 'react'

function Card({className, image, code, class2}){
    return(
        <img src={image} alt={className} key={code} className={[className, class2].join(' ')}/>
    )
}

export default Card;