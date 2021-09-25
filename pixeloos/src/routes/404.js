import React from 'react';
import './404.css';
import cat from '../pets/cat.png';

function NotFound(){
    return (
        <div id='not-found'>
            <h1>Whoops, look like we can't find that for you</h1>
            <img alt='cat' src={cat}/>
        </div>
    )
}

export default NotFound;