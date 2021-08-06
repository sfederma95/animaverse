import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Item from '../components/Item';
import {UserProvider} from './testSetup';

it ('renders item component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Item action='Feed' name='candy' id={1} description='sweet' amount={10} />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Item action='Feed' name='candy' id={1} description='sweet' amount={10}/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})