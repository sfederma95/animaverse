import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import PetSelection from '../components/PetSelection';
import {UserProvider} from './testSetup';

it ('renders pet select component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <PetSelection />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <PetSelection />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})