import React from 'react';
import rat from '../pets/rat.png'
import UserPet from './UserPet'

function UserPage({avatar}){
    return(
        <div>
            <img alt="usr-avatar" src={avatar} height="200px" width="200px"/>
            <h1>Welcome, user!</h1>
            <button>Update Account</button>
            <p>Let's see how your pets are doing!</p>
            <div>
                <UserPet src={rat} name='Ratty' type='Rat' level={1} happiness={50} hunger={50} exp={20} status="Happy" last_fed="1-1-2021" last_play="1-1-2021" />
            </div>
        </div>
    )
}

export default UserPage;