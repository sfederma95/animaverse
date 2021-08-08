import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Private from '../routes/Private'
import {UserProvider} from './testSetup';

it ('renders private route component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Private />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot when logged in', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Private/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it ('matches snapshot when logged out', function(){
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Private />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})