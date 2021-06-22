import React from 'react';

function UserPet({src,name,type,level, happiness, hunger, exp, status, last_fed, last_play}){
    return(
        <div>
            <img alt={type} height="200px" width="200px" src={src}/>
            <p>Type: {type}</p>
            <p>Name: {name}</p>
            <p>Level: {level}</p>
            <p>Level Exp: {exp}</p>
            <p>Happiness: {happiness}</p>
            <p>Hunger: {hunger}</p>
            <p>Status: {status}</p>
            <p>Last Fed: {last_fed}</p>
            <p>Last Played: {last_play}</p>
            <button>Play</button>
            <button>Feed</button>
        </div>
    )
}

export default UserPet;