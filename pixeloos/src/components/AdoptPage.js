import React, {useState, useEffect} from 'react';
import PetSelection from './PetSelection';
import AdoptForm from './AdoptForm'
import './newpet.css'

function AdoptPage(){
    const [petSrc, setPetSrc] = useState(null)
    const [petNum, setPetNum] = useState(0)
    function selectPetType(e){
        const getSrc = window.jQuery(e.target).parent().children('img').attr('src')
        setPetSrc(getSrc)
    }
    const showPet = (n) => {
        const petList = window.jQuery('.adopt-pets');
        window.jQuery(petList[n]).css('display','')
        window.jQuery(petList[n]).siblings('.adopt-pets').css('display','none')
    }
    const goBack = () => {
        setPetSrc(null)
    }
    useEffect(function(){
        showPet(petNum)
    },[petNum])
    
    return(
        <div id='adopt-container'>
            <h1>Choose a pet</h1>
            <p>Choose wisely, there is a limit of two pets per account.</p>
            { petSrc === null ? <PetSelection selectPetType={selectPetType}/> : <AdoptForm src={petSrc} goBack={goBack}/>}
        </div>
    )
}

export default AdoptPage;