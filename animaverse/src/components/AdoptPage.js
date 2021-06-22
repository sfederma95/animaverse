import React from 'react';
import Pet from '../components/Pet';
import rat from '../pets/rat.png'
import panda from '../pets/panda.png'
import cat from '../pets/cat.png'
import bird from '../pets/bird.webp'
import dog from '../pets/dog.png'
import dinosaur from '../pets/dinosaur.png'

function AdoptPage(){
    return(
        <div>
            <h1>Choose your pet!</h1>
            <p>Choose wisely, there is a limit of two pets per account!</p>
            <div>
                <Pet src={rat} type='Rat' level={1} />
                <Pet src={panda} type='Panda' level={1} />
                <Pet src={cat} type='Cat' level={1} />
                <Pet src={dinosaur} type='Dinosaur' level={1} />
                <Pet src={bird} type='Bird' level={1} />
                <Pet src={dog} type='Dog' level={1} />
            </div>
        </div>
    )
}

export default AdoptPage;