import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Navbar from '../nav/Navbar';
import {UserProvider} from './testSetup';

it ('renders nav component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot when logged in', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Navbar/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it ('matches snapshot when logged out', function(){
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})