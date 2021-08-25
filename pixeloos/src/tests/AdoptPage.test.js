import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import AdoptPage from '../components/AdoptPage';
import {UserProvider} from './testSetup';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

it ('renders choose pet page as a whole without crashing', function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <AdoptPage />
            </UserProvider>
        </MemoryRouter>
    )
})

it ('matches snapshot', function(){
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <AdoptPage />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})