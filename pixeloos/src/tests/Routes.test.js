import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Routes from '../routes/Routes'
import {UserProvider} from './testSetup';

it ('renders routes component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Routes />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Routes/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})