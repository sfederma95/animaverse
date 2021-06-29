import React from 'react';

function Pet({src,type,level, buttonFn}){
    return(
        <div>
            <img alt={type} src={src}/>
            <p>Type: {type}</p>
            <p>Level: {level}</p>
            <button onClick={buttonFn}>Select</button>
        </div>
    )
}

export default Pet;