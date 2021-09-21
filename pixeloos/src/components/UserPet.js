import React, {useState} from 'react';
import InteractWindow from './InteractWindow';
import convertDate from './datetime';

function UserPet({userId, src,name,type,level, happiness, hunger, exp, status, last_fed, last_play, petId}){
    const [action,setAction] = useState(null)
    const [petInfo, setPetInfo] = useState(false)
    const displayInfo = () => {
        petInteract===false ? setPetInfo(true) : setPetInfo(false)
    }
    const hideInfo = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)){
            setPetInfo(false)
            setPetInteract(false)
            let notThisPet = window.jQuery(`#${petId}`).siblings('.each-pet')
            window.jQuery(notThisPet).css('display','')
        }
    }
    const [petInteract, setPetInteract] = useState(false)
    const displayInteract = (e) => {
        let notThisPet = window.jQuery(`#${petId}`).siblings('.each-pet')
        window.jQuery(notThisPet).css('display','none')
        let btnHTML = window.jQuery(e.target).html();
        setAction(btnHTML)
        setPetInfo(false)
        setPetInteract(true)
    }
    return(
        <div tabIndex="0" onBlur={hideInfo} id={`${petId}`} className='each-pet'>
            <img onClick={displayInfo} alt={type} className='pet-img' src={src}/>
            <span className='loved'>♥️</span>
            {petInfo ? <div className='pet-text'>
                <p>Name: {name}</p>
                <p>Level: {level}</p>
                <p>Level Exp: {exp}</p>
                <p>Happiness: {happiness}</p>
                <p>Fullness: {hunger}</p>
                <p>Status: {status}</p>
                <p>Last Fed: {convertDate(last_fed)}</p>
                <p>Last Played: {convertDate(last_play)}</p>
                <div className='btn-group'>
                    <button onClick={displayInteract} className='btns'>Feed</button>
                    <button onClick={displayInteract} className='btns'>Play</button>
                    <button onClick={hideInfo} className='btns'>Back</button>
                </div>
            </div> : null}
            {petInteract === true ? <InteractWindow action={action} pet_id={petId} petInfo={setPetInfo} interaction = {setPetInteract}/> : null}
        </div>
    )
}

export default UserPet;