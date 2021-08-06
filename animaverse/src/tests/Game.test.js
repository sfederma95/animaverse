import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Game from '../components/Game';
import {UserProvider} from './testSetup';

it ('renders minigame component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Game />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Game/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})