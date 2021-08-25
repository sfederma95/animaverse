import React from 'react';
import UserContext from '../users/UserContext';

const testUser = {
    username: 'someuser',
    password: 'someuser',
    usr_id: 7,
    gold_amt: 10000,
    pets: [
      {
        id: 1,
        pet_name: "panda",
        hunger: 70,
        happiness: 50,
        pet_lvl: 1,
        pet_img: "/static/media/panda.a4449892.png",
        pet_status: "Happy",
        lvl_exp: 13,
        last_fed: null,
        last_play: null
      }
    ],
    inventory: [
      {
        item_id: 1
      },
      {
        item_id: 8
      }
    ]
}

const UserProvider = ({children, currentUser = testUser}) => (
    <UserContext.Provider value={{currentUser}}>
        {children}
    </UserContext.Provider>
);

export {UserProvider}