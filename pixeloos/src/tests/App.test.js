import React from 'react';
import {render} from '@testing-library/react';
import App from '../App';

it ('renders app without crashing',function(){
    render(<App/>)
});