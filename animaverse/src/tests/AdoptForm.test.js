import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import AdoptForm from '../components/AdoptForm';
import {UserProvider} from './testSetup';

it ('renders choose pet component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <AdoptForm src='rat.png'/>
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <AdoptForm src='rat.png'/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})