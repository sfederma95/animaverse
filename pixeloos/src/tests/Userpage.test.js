import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import UserPage from '../components/UserPage';
import {UserProvider} from './testSetup';

it ('renders user profile component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <UserPage/>
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <UserPage/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})