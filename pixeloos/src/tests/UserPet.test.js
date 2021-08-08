import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import UserPet from '../components/UserPet';
import {UserProvider} from './testSetup';

it ('renders user pet component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <UserPet name='jerry' type='mouse' level={1} happiness={1} hunger={1} exp={20} status='happy' petId={1}/>
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <UserPet name='jerry' type='mouse' level={1} happiness={1} hunger={1} exp={20} status='happy' petId={1}/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})