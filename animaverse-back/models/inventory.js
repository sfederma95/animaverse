const db = require('../db');
const ExpressError = require('../expressError')
const validIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

class Inventory{
    static async addToInv(usr_id, item_id){
        if (validIds.indexOf(item_id)===-1) throw new ExpressError('That is an invalid item id',404)
        const res = await db.query(
            `SELECT username FROM users WHERE usr_id=$1`,
            [usr_id]
        );
        const user = res.rows[0];
        if(!user) throw new ExpressError('Could not find that user',404)
        await db.query(`INSERT INTO 
        inventories (item_id,usr_id)
        VALUES ($1,$2)`,
        [item_id,usr_id])
        const getInv = await this.getInventory(usr_id)
        return getInv;
    }

    static async removeFromInv(usr_id, item_id){
        const res = await db.query(
        `SELECT username FROM users WHERE usr_id=$1`,
        [usr_id]
        );
        const user = res.rows[0];
        if(!user) throw new ExpressError('Could not find that user',404)
        const check = await db.query(`SELECT * FROM inventories WHERE item_id=$1 AND usr_id=$2`,[item_id,usr_id])
        if(check.rows[0]===undefined) throw new ExpressError("That item does not exist in your inventory",500)
        await db.query(`DELETE FROM inventories
        WHERE ctid IN (SELECT ctid FROM inventories WHERE usr_id=$2 AND item_id=$1
        LIMIT 1)`,
        [item_id,usr_id])
        const getInv = await this.getInventory(usr_id)
        return getInv;
    }

    static async getInventory(usr_id) {
        const userSearch = await db.query(
            `SELECT username FROM users WHERE usr_id=$1`,
            [usr_id]
            );
        const user = userSearch.rows[0];
        if(!user) throw new ExpressError('Could not find that user',404)
        const res = await db.query(
            `SELECT item_id from inventories WHERE inventories.usr_id = $1`,[usr_id]
        );
        return res.rows;
    }
}

module.exports = Inventory;