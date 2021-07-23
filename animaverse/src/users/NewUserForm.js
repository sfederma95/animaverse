import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../Alert'
import './register.css';
import sleepCat from './sleepcat.svg';
import {hideCat, showCat} from './forms'

function NewUserForm({register}){
    const history = useHistory();
    const [formData,setFormData]=useState({
        username: "",
        password: "",
        email: "",
        avatar: "",
    })
    const [formErrors,setFormErrors] = useState([])
    async function handleSubmit(e){
        e.preventDefault();
        let res = await register(formData);
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
        <div id='reg-form'>
            <h1 id='tagline'>Sign up to start playing with Pixeloos</h1>
            <form id='form-el' onSubmit={handleSubmit}>
                <p id='register-p'>Register:</p>
                <div className='inputs'>
                    <img alt='sleep cat' className='sleep-cat' src={sleepCat}/>
                    <label className = 'labels' htmlFor='username'>Username: </label>
                    <input onFocus = {showCat} onBlur = {hideCat} className='input-el good-input' id='username' name='username' value={formData.username} onChange={handleChange} type='text'/>
                </div>
                <div className='inputs'>
                    <img alt='sleep cat' className='sleep-cat' src={sleepCat}/>
                    <label className = 'labels' htmlFor='password'>Password: </label>
                    <input onFocus = {showCat} onBlur = {hideCat} className='input-el good-input' id='password' name='password' value={formData.password} onChange={handleChange} type='text' />
                </div>
                <div className='inputs'>
                    <img alt='sleep cat' className='sleep-cat' src={sleepCat}/>
                    <label className = 'labels' htmlFor='email'>Email: </label>
                    <input onFocus = {showCat} onBlur = {hideCat} className='input-el good-input' id='email' name='email' value={formData.email} onChange={handleChange} type='text' />
                </div>
                <div className='inputs'>
                    <img alt='sleep cat' className='sleep-cat' src={sleepCat}/>
                    <label className = 'labels' htmlFor='avatar'>Avatar URL: </label>
                    <input onFocus = {showCat} onBlur = {hideCat} className='input-el good-input' id='avatar' name='avatar' value={formData.avatar} onChange={handleChange} type='text'/>
                </div>
                {formErrors.length ? <Alert messages={formErrors}/> : null}
                <button id='reg-btn'>Register</button>
            </form>
        </div>
    )
}

export default NewUserForm;