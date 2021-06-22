import React from 'react';

function Pet({src,type,level}){
    return(
        <div>
            <img alt={type} src={src}/>
            <p>Type: {type}</p>
            <p>Level: {level}</p>
            <button>Select</button>
        </div>
    )
}

export default Pet;