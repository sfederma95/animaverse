import React, {useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';
import './nav.css'
import homeBtn from './home-btn.svg'
import disappear from './nav'

function Navbar({logout}){
    const {currentUser} = useContext(UserContext)
    function loggedIn(){
        return(
            <ul>
                <li>
                <NavLink to='/'>
                Home
            </NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${currentUser.usr_id}`}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${currentUser.usr_id}/shop`}>
                        Shop
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${currentUser.usr_id}/inventory`}>
                        Inventory
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${currentUser.usr_id}/game`}>
                        Play Game
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' onClick={logout}>
                        Logout
                    </NavLink>
                </li>
            </ul>
        )
    }
    function loggedOut(){
        return(
            <ul>
                <li>  <NavLink to='/'>
                Home
            </NavLink></li>
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
            </ul>
            
        )
    }

    return(
        <nav id='navbar'>
            {/* {currentUser ? loggedIn() : loggedOut()} */}
            <img onClick={disappear} alt='home button' id='home-btn' src={homeBtn}/>
        </nav>
    )
}

export default Navbar;