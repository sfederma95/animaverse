import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';
import './nav.css'
import homeBtn from './home-btn.svg'
import {disappear, homeBtnBack} from './nav'

function Navbar({logout}){
    const {currentUser} = useContext(UserContext)
    function logoutBtn(){
        homeBtnBack();
        logout();
    }
    function loggedIn(){
        return(
                <div className='links-div'>
                    <NavLink onClick={homeBtnBack} className='nav-li' to={`/users/${currentUser.usr_id}`}>
                        Profile
                    </NavLink>
                    <NavLink onClick={homeBtnBack} className='nav-li' to={`/${currentUser.usr_id}/game`}>
                        Play Game
                    </NavLink>

                    <NavLink onClick={logoutBtn} className='nav-li' to='/'>
                        Logout
                    </NavLink>
                </div>
        )
    }
    function loggedOut(){
        return(
            <div className='links-div'>
                    <NavLink onClick={homeBtnBack} className='nav-li' to='/'>
                        Home
                    </NavLink>
                    <NavLink onClick={homeBtnBack} className='nav-li' to='/login'>
                        Login
                    </NavLink>
                    <NavLink onClick={homeBtnBack} className='nav-li' to='/register'>
                        Sign Up
                    </NavLink>
            </div>
            
        )
    }

    return(
        <nav id='navbar'>
            {currentUser ? loggedIn() : loggedOut()}
            <img onClick={disappear} alt='home button' id='home-btn' src={homeBtn}/>
        </nav>
    )
}

export default Navbar;