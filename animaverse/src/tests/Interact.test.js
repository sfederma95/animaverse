import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import InteractWindow from '../components/InteractWindow';
import {UserProvider} from './testSetup';

it ('renders interaction component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <InteractWindow action='Feed' pet_id={1} />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <InteractWindow action='Feed' pet_id={1}/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})