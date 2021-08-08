import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Homepage from '../components/Homepage';
import {UserProvider} from './testSetup';

it ('renders homepage component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Homepage />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot when logged in', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Homepage/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it ('matches snapshot when logged out', function(){
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Homepage />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})