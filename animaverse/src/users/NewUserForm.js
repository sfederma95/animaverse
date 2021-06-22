import React from 'react';

function NewUserForm(){
    return(
        <div>
            <h1>Sign up and get your first pet!</h1>
            <form>
                <div>
                    <label for='username'>Username</label>
                    <input id='username' name='username' type='text'/>
                </div>
                <div>
                    <label for='password'>Password</label>
                    <input id='password' name='password' type='text'/>
                </div>
                <div>
                    <label for='email'>Email</label>
                    <input id='email' name='email' type='text'/>
                </div>
                <div>
                    <label for='avatar'>Avatar URL</label>
                    <input id='avatar' name='avatar' type='text'/>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default NewUserForm;