import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../Alert'
import './login.css';

function LoginForm({login}){
    const history = useHistory();
    const [formData,setFormData]=useState({
        username: "",
        password: ""
    })
    const [formErrors,setFormErrors] = useState([])
    async function handleSubmit(e){
        e.preventDefault();
        let res = await login(formData);
        if (res.errors) {
            setFormErrors(res.errors)
        } else{
            history.push(`/users/${res.user.usr_id}`)
        }
    }
    function handleChange(e){
        const {name,value} = e.target;
        setFormData(l=>({...l,[name]:value}))
    }
    return(
        <div id='login-form'>
            <h1 id='tagline'>Login below</h1>
            <form id='form-el' onSubmit={handleSubmit}>
                <p id='login-p'>Login:</p>
                <div className='inputs'>
                    <label className = 'labels' htmlFor='username'>Username</label>
                    <input className='input-el' id='username' name='username' value={formData.username} onChange={handleChange} type='text' required/>
                </div>
                <div className='inputs'>
                    <label className = 'labels' htmlFor='password'>Password</label>
                    <input className='input-el' id='password' name='password' value={formData.password} onChange={handleChange} type='text' required/>
                </div>
                {formErrors.length ? <Alert messages={formErrors}/> : null}
                <button id='login-btn'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;