import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../Alert'

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
        <div>
            <h1>Login below</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input id='username' name='username' value={formData.username} onChange={handleChange} type='text' required/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' value={formData.password} onChange={handleChange} type='text' required/>
                </div>
                {formErrors.length ? <Alert messages={formErrors}/> : null}
                <button >Login</button>
            </form>
        </div>
    )
}

export default LoginForm;