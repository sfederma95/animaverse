import React from 'react';
import {NavLink} from 'react-router-dom'

function Navbar(){
    return(
        <ul>
            <li>
                <NavLink to='/login'>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to='/register'>
                    Sign Up
                </NavLink>
            </li>
            <li>
                <NavLink to='/questions'>
                    FAQ
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar;