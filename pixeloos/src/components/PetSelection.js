import React, {useEffect, useState} from 'react';
import Pet from './Pet';
import rat from '../pets/rat.png'
import panda from '../pets/panda.png'
import cat from '../pets/cat.png'
import bird from '../pets/bird.webp'
import dog from '../pets/dog.png'
import dinosaur from '../pets/dinosaur.png'

function PetSelection({selectPetType}){
    const [petNum, setPetNum] = useState(0)
    const showPet = (n) => {
        const petList = window.jQuery('.adopt-pets');
        window.jQuery(petList[n]).css('display','')
        window.jQuery(petList[n]).siblings('.adopt-pets').css('display','none')
    }
    useEffect(function(){
        showPet(petNum)
    },[petNum])
    const arrowForward = () =>{
        const petList = window.jQuery('.adopt-pets');
        if (petNum > petList.length-1) {
            setPetNum(0)
        }
        else{
            setPetNum(petNum+1)
        }
    }
    const arrowBack= () =>{
        const petList = window.jQuery('.adopt-pets');
        if (petNum === 0) {
            setPetNum(petList.length-1)
        }
        else{
            setPetNum(petNum-1)
        }
    }
    return (
        <div className="slideshow-container">
            <button className="prev" onClick={arrowBack}>&#10094;</button>
            <Pet src={rat} n={1} type='Rat' level={1} buttonFn={selectPetType} />
            <Pet src={panda} n={2} type='Panda' level={1} buttonFn={selectPetType}/>
            <Pet src={cat} n={3} type='Cat' level={1} buttonFn={selectPetType}/>
            <Pet src={dinosaur} n={4} type='Dinosaur' level={1} buttonFn={selectPetType}/>
            <Pet src={bird} n={5} type='Bird' level={1} buttonFn={selectPetType}/>
            <Pet src={dog} n={6} type='Dog' level={1} buttonFn={selectPetType}/>
            <button className="next" onClick={arrowForward}>&#10095;</button>
        </div>
    )
}

export default PetSelection;