const db = require('../db');
const ExpressError = require('../expressError')

class Inventory{
    // if item id does not exist, error, need list of id's to match against
    static async addToInv(usr_id, item_id){
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
        return true;
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
        return true;
    }

    static async getInventory(usr_id) {
        const res = await db.query(
            `SELECT item_id from inventories WHERE inventories.usr_id = $1`,[usr_id]
        );
        return res.rows;
    }
}

module.exports = Inventory;