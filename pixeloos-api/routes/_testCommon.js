process.env.NODE_ENV = 'test';
const db = require('../db');
const bcrypt = require('bcrypt');
const {createToken} = require('../helpers/token')

const userIds = [];
const petIds = [];
const tokens = [];

async function commonBeforeAll(){
    await db.query('DELETE FROM users')
    await db.query('DELETE FROM pets')
    await db.query('DELETE FROM inventories')

    const users = await db.query(`INSERT INTO users(username, usr_password, email, gold_amt, last_login )
    VALUES ('user1',$1,'user1@yahoo.com',500,CURRENT_DATE),
    ('user2',$2,'user2@yahoo.com',500,CURRENT_DATE) RETURNING usr_id`,[await bcrypt.hash('password1',1),await bcrypt.hash('password2',1)])
    userIds.splice(0,0,...users.rows.map(u=>u.usr_id))
    const pets = await db.query(`INSERT INTO pets (pet_name,hunger,happiness,pet_img, pet_status, usr_id)
    VALUES ('pet1',50,50,'img1','Happy',$1),
    ('pet2',50,50,'img2','Happy',$2) RETURNING id`,[userIds[0],userIds[1]])
    petIds.splice(0,0,...pets.rows.map(p=>p.id))
    await db.query(`INSERT INTO inventories (item_id,usr_id)
    VALUES (1,$1), (1,$2)`,[userIds[0],userIds[1]])
    tokens.push(createToken({username:'user1',usr_id:userIds[0]}))
    tokens.push(createToken({username:'user2',usr_id:userIds[1]}))
}

async function commonBeforeEach(){
    await db.query('BEGIN')
}

async function commonAfterEach(){
    await db.query('ROLLBACK')
}

async function commonAfterAll(){
    await db.end()
}

module.exports = {
    commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds, petIds, tokens
}