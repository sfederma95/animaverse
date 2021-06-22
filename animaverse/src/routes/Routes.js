import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Homepage from '../components/Homepage'
import AdoptPage from '../components/AdoptPage'
import UserPage from '../components/UserPage'
import Shop from '../components/Shop'
import Inventory from '../components/Inventory'
import NewUserForm from '../users/NewUserForm'
import UpdateUserForm from '../users/UpdateUserForm'

function Routes(){
    return(
        <div>
            <Switch>
                <Route exact path='/'>
                    <Homepage />
                </Route>
                <Route exact path='/register'>
                    <NewUserForm />
                </Route>
                <Route exact path='/:id/update'>
                    <UpdateUserForm />
                </Route>
                <Route exact path='/:id/adopt'>
                    <AdoptPage />
                </Route>
                <Route exact path='/users/:id'>
                    <UserPage avatar='https://cdn4.iconfinder.com/data/icons/user-interface-glyph-5/32/User-512.png'/>
                </Route>
                <Route exact path='/:id/shop'>
                    <Shop />
                </Route>
                <Route exact path='/:id/inventory'>
                    <Inventory />
                </Route>
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default Routes; 