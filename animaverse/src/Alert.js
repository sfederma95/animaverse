import React from 'react';

function Alert({messages=[]}){
    return(
        <div>
            {messages.map(err=>(
                <p key={err.response.data.error.msg}>{err.response.data.error.msg}</p>
            ))}
        </div>
    )
}

export default Alert;