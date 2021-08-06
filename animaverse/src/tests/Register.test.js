import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import NewUserForm from '../users/NewUserForm';
import {UserProvider} from './testSetup';

it ('renders registration form component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <NewUserForm />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <NewUserForm/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})