import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Homepage from '../components/Homepage'
import AdoptPage from '../components/AdoptPage'
import UserPage from '../components/UserPage'
import NewUserForm from '../users/NewUserForm'
import Private from './Private'
import LoginForm from '../users/LoginForm'
import Game from '../components/Game'
import InteractWindow from '../components/InteractWindow'
import NotFound from './404';

function Routes({login, register}){
    return(
        <div>
            <Switch>
                <Route exact path='/'>
                    <Homepage />
                </Route>
                <Route exact path='/register'>
                    <NewUserForm register={register} />
                </Route>
                <Route exact path='/login'>
                    <LoginForm login={login} />
                </Route>
                <Private exact path='/:id/game'>
                    <Game />
                </Private>
                <Private exact path='/:id/:pet_id/feed'>
                    <InteractWindow action="Feed" />
                </Private>
                <Private exact path='/:id/:pet_id/play'>
                    <InteractWindow action='Play' />
                </Private>
                <Private exact path='/:id/adopt'>
                    <AdoptPage />
                </Private>
                <Private exact path='/user/:id'>
                    <UserPage  />
                </Private>
                <Route component={NotFound}/>
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default Routes; 