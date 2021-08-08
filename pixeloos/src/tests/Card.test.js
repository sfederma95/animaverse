import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Card from '../components/Card';
import {UserProvider} from './testSetup';

it ('renders card component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Card code='2C' className='p1' class2='active' />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Card code='2C' className='p1' class2='active' />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})