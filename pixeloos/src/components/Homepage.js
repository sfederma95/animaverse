import React from 'react';
import {Link} from 'react-router-dom';
import './homepage.css'
import rat from '../pets/rat.png'
import panda from '../pets/panda.png'
import cat from '../pets/cat.png'
import bird from '../pets/bird.webp'
import dog from '../pets/dog.png'
import dinosaur from '../pets/dinosaur.png'

function Homepage(){
    return(
        <div>
            <h1 className='header headerColors'>Welcome to <span id='pixeloos'>Pixeloos</span></h1>
            <p id='hm-tagline'>Meet pixeloos, play with and feed them, make new memories!</p>
            <Link className='hm-links' id='login' to='/login'>Log in</Link>
            <Link className='hm-links' id='register' to='/register'>Sign up</Link>
            <div id='pet-contain'>
                <img id='dino' src={dinosaur} alt='dino'/>
                <img id='cat' src={cat} alt='cat'/>
                <img id='panda' src={panda} alt='panda'/>
                <img id='dog' src={dog} alt='dog'/>
                <img id='bird' src={bird} alt='bird'/>
                <img id='rat' src={rat} alt='rat'/>
            </div>
        </div>
    )
}

export default Homepage;