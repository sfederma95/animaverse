import React from 'react';
import {Link} from 'react-router-dom';
import './homepage.css'

function Homepage(){
    return(
        <div>
            <h1 className='header headerColors'>Welcome to <span id='pixeloos'>Pixeloos</span></h1>
            <p id='tagline'>Meet pixeloos, play with and feed them, make new memories!</p>
            <Link className='links' id='login' to='/login'>Log in</Link>
            <Link className='links' id='register' to='/register'>Sign up</Link>
        </div>
    )
}

export default Homepage;