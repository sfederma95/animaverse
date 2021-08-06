import React from 'react';
import UserContext from '../users/UserContext';

const testUser = {
    username: 'someuser',
    password: 'someuser',
    usr_id: 7
}

const UserProvider = ({children, currentUser = testUser}) => (
    <UserContext.Provider value={{currentUser}}>
        {children}
    </UserContext.Provider>
);

export {UserProvider}