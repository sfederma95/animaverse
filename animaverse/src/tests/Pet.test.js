import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Pet from '../components/Pet';
import {UserProvider} from './testSetup';

it ('renders pet component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Pet type='dog' level={1} n={1}/>
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Pet type='dog' level={1} n={1}/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})