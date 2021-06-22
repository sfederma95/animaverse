import React from 'react';
import {Link} from 'react-router-dom';

function Homepage(){
    return(
        <div>
            <h1>Page title</h1>
            <p>Adopt a pet, play with pets, make new friends!</p>
            <p>
                <Link to='/login'>Log in</Link>
                <Link to='/register'>Sign up</Link>
            </p>
        </div>
    )
}

export default Homepage;