import React from 'react';
import warning from './warning.svg'
import './alert.css';

function Alert({messages=[]}){
    console.log(typeof messages[0].response.data.error.msg)
    const errArr = messages.map(err=>{
        if (typeof err.response.data.error.msg === 'string'){
            return (
            <p id='err-container'><span key={err.response.data.error.msg} className='errors'>
            <img alt='warning error' className='err-img' src={warning}/>
            <span className='err-text'>{err.response.data.error.msg.toUpperCase()}.</span>
            </span></p>)
        } else {
            return <p id='err-container'>{err.response.data.error.msg.map(e=>(<span key={e} className='errors'>
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