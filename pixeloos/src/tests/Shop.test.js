import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Shop from '../components/Shop';
import {UserProvider} from './testSetup';

it ('renders shop component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Shop/>
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Shop/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})