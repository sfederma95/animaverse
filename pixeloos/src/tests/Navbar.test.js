import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import Navbar from '../nav/Navbar';
import {UserProvider} from './testSetup';
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;

it ('renders nav component without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot when logged in', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Navbar/>
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it ('matches snapshot when logged out', function(){
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it ('hides home button appropriately', function(){
    const {container} = render(
        <MemoryRouter>
            <UserProvider>
                <Navbar/>
            </UserProvider>
        </MemoryRouter>
    );
    expect(container.getElementsByClassName('nav-li')[0]).toHaveStyle('opacity:0%');
    const hmbtn = container.querySelector('#home-btn');
    fireEvent.click(hmbtn);
    expect(hmbtn).not.toBeVisible();
})