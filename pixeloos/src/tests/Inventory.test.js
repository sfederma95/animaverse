import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Inventory from '../components/Inventory';
import {UserProvider} from './testSetup';

it ('renders inventory component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Inventory />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Inventory/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})