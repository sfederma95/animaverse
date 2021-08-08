import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import ShopItem from '../components/ShopItem';
import {UserProvider} from './testSetup';

it ('renders shop item component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <ShopItem name='candy' id={1} description='sweet' amount={10} price={10} userGold={500}/>
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <ShopItem name='candy' id={1} description='sweet' amount={10} price={10} userGold={500}/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})