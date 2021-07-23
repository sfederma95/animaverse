import React, {useState} from 'react';
import Pet from '../components/Pet';
import rat from '../pets/rat.png'
import panda from '../pets/panda.png'
import cat from '../pets/cat.png'
import bird from '../pets/bird.webp'
import dog from '../pets/dog.png'
import dinosaur from '../pets/dinosaur.png'
import AdoptForm from './AdoptForm'

function AdoptPage(){
    const [petSrc, setPetSrc] = useState(null)
    function selectPetType(e){
        const getSrc = e.target.parentNode.firstChild.getAttribute('src')
        setPetSrc(getSrc)
    }
    return(
        <div>
            <h1>Choose a pet</h1>
            <p>Choose wisely, there is a limit of two pets per account.</p>
            {petSrc===null ? <div>
                <Pet src={rat} type='Rat' level={1} buttonFn={selectPetType} />
                <Pet src={panda} type='Panda' level={1} buttonFn={selectPetType}/>
                <Pet src={cat} type='Cat' level={1} buttonFn={selectPetType}/>
                <Pet src={dinosaur} type='Dinosaur' level={1} buttonFn={selectPetType}/>
                <Pet src={bird} type='Bird' level={1} buttonFn={selectPetType}/>
                <Pet src={dog} type='Dog' level={1} buttonFn={selectPetType}/>
            </div> :
            <AdoptForm src={petSrc}/>}
        </div>
    )
}

export default AdoptPage;