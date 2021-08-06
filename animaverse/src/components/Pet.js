import React from 'react';

function Pet({src,type,level, buttonFn, n}){
    return(
        <div className='adopt-pets'>
            <p>{n} / 6</p>
            <img onClick={buttonFn} alt={type} src={src}/>
            <p>Type: {type}</p>
            <p>Level: {level}</p>
        </div>
    )
}

export default Pet;