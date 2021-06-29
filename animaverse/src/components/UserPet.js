import React from 'react';
import {Link} from 'react-router-dom'

function UserPet({userId, src,name,type,level, happiness, hunger, exp, status, last_fed, last_play, petId}){
    return(
        <div>
            <img alt={type} height="200px" width="200px" src={src}/>
            {type ? <p>Type: {type}</p> : null}
            <p>Name: {name}</p>
            <p>Level: {level}</p>
            <p>Level Exp: {exp}</p>
            <p>Happiness: {happiness}</p>
            <p>Hunger: {hunger}</p>
            <p>Status: {status}</p>
            <p>Last Fed: {last_fed}</p>
            <p>Last Played: {last_play}</p>
            <button><Link to={`/${userId}/${petId}/feed`}>Feed</Link></button>
            <button><Link to={`/${userId}/${petId}/play`}>Play</Link></button>
        </div>
    )
}

export default UserPet;