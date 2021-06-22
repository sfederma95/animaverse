import React from 'react';

function UpdateUserForm(){
    return(
        <div>
            <h1>Update your e-mail or avatar below:</h1>
            <form>
                <div>
                    <label for='email'>Email</label>
                    <input id='email' name='email' type='text'/>
                </div>
                <div>
                    <label for='avatar'>Avatar URL</label>
                    <input id='avatar' name='avatar' type='text'/>
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateUserForm;