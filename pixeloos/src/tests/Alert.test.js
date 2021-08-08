import React from 'react';
import {render} from '@testing-library/react';
import Alert from '../Alert';

it ('renders without crashing',function(){
    render(<Alert />)
})

it ('matches snapshot with one message',function(){
    let messages = [{
        response:{
            data:{
                error:{
                    msg: 'Invalid password/username'
                }
            }
        }
    }]
    const {asFragment} = render(<Alert messages={messages} />)
    expect(asFragment()).toMatchSnapshot();
})

it ('matches snapshot with multiple messages',function(){
    let messages = [{
        response:{
            data:{
                error:{
                    msg: ['Invalid password/username','Email must be in email format']
                }
            }
        }
    }]
    const {asFragment} = render(<Alert messages={messages} />)
    expect(asFragment()).toMatchSnapshot();
})