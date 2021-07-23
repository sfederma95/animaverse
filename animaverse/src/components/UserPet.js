import React, {useState} from 'react';
import {Link} from 'react-router-dom'

function UserPet({userId, src,name,type,level, happiness, hunger, exp, status, last_fed, last_play, petId}){
    const [petInfo, setPetInfo] = useState(false)
    const displayInfo = () => {
        setPetInfo(true)
    }
    const hideInfo = () => {
        setPetInfo(false)
    }
    return(
        <div className='each-pet'>
            <img tabIndex="0" onBlur={hideInfo} onClick={displayInfo} alt={type} className='pet-img' src={src}/>
            {petInfo ? <div className='pet-text'>
                <p>Name: {name}</p>
                <p>Level: {level}</p>
                <p>Level Exp: {exp}</p>
                <p>Happiness: {happiness}</p>
                <p>Hunger: {hunger}</p>
                <p>Status: {status}</p>
                <p>Last Fed: {last_fed}</p>
                <p>Last Played: {last_play}</p>
                <div className='btn-group'>
                    <button className='btns'>Feed</button>
                    <button className='btns'>Play</button>
                </div>
            </div> : null}
        </div>
    )
}

export default UserPet;