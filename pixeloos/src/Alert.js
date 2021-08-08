import React, {useEffect} from 'react';
import warning from './warning.svg'
import './alert.css';
import { v4 as uuidv4 } from 'uuid';
import targetErrInputs from './users/helper'

function Alert({messages=[]}){
    useEffect(()=>{
        targetErrInputs(messages)
    },[messages])
    const errArr = messages.map(err=>{
        if (typeof err.response.data.error.msg === 'string'){
            return (
            <p key={uuidv4()} id='err-container'><span key={err.response.data.error.msg} className='errors'>
            <img alt='warning error' className='err-img' src={warning}/>
            <span className='err-text'>{err.response.data.error.msg.toUpperCase()}.</span>
            </span></p>)
        } else {
            return <p key={uuidv4()} id='err-container'>{err.response.data.error.msg.map(e=>(<span key={e} className='errors'>
            <img alt='warning error' className='err-img' src={warning}/>
            <span className='err-text'>{e.toUpperCase()}.</span>
            </span>))}</p>
        }
    })
    return(
        <div>
            {errArr}
        </div>
    )
}

export default Alert;