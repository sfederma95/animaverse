import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import LoginForm from '../users/LoginForm';
import {UserProvider} from './testSetup';

it ('renders login form component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <LoginForm />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <LoginForm/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})