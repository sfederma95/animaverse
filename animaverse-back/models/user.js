const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config.js');
const ExpressError = require('../expressError')
const Inventory = require('./inventory')

class User {
    static async authenticate({username,password}){
        const res = await db.query(
            `SELECT usr_id, username, usr_password, gold_amt, usr_avt, last_login FROM users WHERE username=$1`,
            [username]
        );
        const user = res.rows[0];
        if(user){
            const validLogin = await bcrypt.compare(password,user.usr_password);
            if(validLogin === true){
                delete user.usr_password;
                await db.query(`UPDATE users SET last_login=CURRENT_DATE WHERE usr_id=$1`,[user.usr_id])
                user.pets = await this.getPets(user.usr_id);
                user.inventory = await Inventory.getInventory(user.usr_id)
                return user;
            }
        }
        throw new ExpressError('Invalid username/password',500);
    };

    static async getAll(){
        let users = await db.query(
            `SELECT usr_id, username, usr_avt, last_login FROM users ORDER BY usr_id`
        );
        for (let i=0;i<users.rows.length;i++){
            let u = users.rows[i];
            u.pets = await User.getPets(u.usr_id)
        }
        return users.rows;
    }

    static async getPets(usr_id) {
        const res = await db.query(
            `SELECT id,pet_name,hunger,happiness,pet_lvl,pet_img,pet_status FROM pets WHERE pets.usr_id = $1`,[usr_id]
        )
        if(res.rows[0]===undefined) throw new ExpressError('That user does not have any pets', 404)
        return res.rows;
    }

    static async get(usr_id){
        const res = await db.query(
            `SELECT usr_id, username, gold_amt, usr_avt, last_login FROM users WHERE usr_id=$1`,
            [usr_id]
        );
        const user = res.rows[0];
        if(!user) throw new ExpressError('Could not find that user', 404)
        user.pets = await this.getPets(user.usr_id);
        user.inventory = await Inventory.getInventory(user.usr_id)
        return user;
    }

    static async register({username,password,email,avatar}) {
        const dupCheck = await db.query(`SELECT username FROM users WHERE username=$1`,[username]);
        if (dupCheck.rows[0]){
            throw new ExpressError('That username already exists',500)
        }
        const gold_amt = 500;
        const usr_avt = avatar || 'https://cdn4.iconfinder.com/data/icons/user-interface-glyph-5/32/User-512.png';
        const hashPass = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);
        const res = await db.query(
            `INSERT INTO users
            (username,usr_password,email,gold_amt,usr_avt,last_login)
            VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
            RETURNING usr_id, username, gold_amt, usr_avt, last_login`,[
                username, hashPass, email, gold_amt, usr_avt
            ]
        )
        const user = res.rows[0];
        return user;
    }

    static async addGold(usr_id, goldToAdd){
        const res = await db.query(
            `SELECT gold_amt FROM users WHERE usr_id=$1`,
            [usr_id]
        );
        const user = res.rows[0];
        if(!user) throw new ExpressError('Could not find that user',404)
        let newGoldAmt = goldToAdd + user.gold_amt
        await db.query(`UPDATE users SET gold_amt=$1 WHERE usr_id=$2`,[newGoldAmt,usr_id])
        return {usr_id, gold_amt:newGoldAmt}
    }

    static async decGold(usr_id, goldToDec){
        const res = await db.query(
            `SELECT gold_amt FROM users WHERE usr_id=$1`,
            [usr_id]
        );
        const user = res.rows[0];
        if(!user) throw new ExpressError('Could not find that user',404)
        if (user.gold_amt - goldToDec < 0) {
            throw new ExpressError("Looks like you're out of gold! Oh no!",500)
        } else {
            let newGoldAmt = user.gold_amt - goldToDec;
            await db.query(`UPDATE users SET gold_amt=$1 WHERE usr_id=$2`,[newGoldAmt,usr_id])
            return {usr_id, gold_amt:newGoldAmt}
        }
    }

    static async update({email,avatar},usr_id){
        const res = await db.query(
            `SELECT usr_id, username, usr_avt, email FROM users WHERE usr_id=$1`,
            [usr_id]
        );
        const user = res.rows[0];
        if(!user) throw new ExpressError('Could not find that user', 404)
        let new_email = email || user.email;
        let new_avt = avatar || user.usr_avt;
        const updatedUser = await db.query(`UPDATE users SET email=$1,usr_avt=$2 WHERE usr_id=$3 RETURNING usr_id, username, usr_avt, email`,[new_email, new_avt,usr_id])
        return updatedUser.rows[0];
    }
}

module.exports = User;