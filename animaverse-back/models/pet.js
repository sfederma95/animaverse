const db = require('../db');
const ExpressError = require('../expressError')

class Pet {

    static async getAll(){
        const pets = await db.query(
            `SELECT id, pet_name, hunger, happiness, pet_lvl, pet_img, pet_status, usr_id FROM pets ORDER BY id`
        );
        for (let i=0;i<pets.rows.length;i++){
            let p = pets.rows[i];
            let u = await db.query(`SELECT usr_id, username, usr_avt, last_login FROM users WHERE usr_id=$1`,[p.usr_id])
            p.user = u.rows[0]
        }
        return pets.rows;
    }

    static async getPet(id){
        const res = await db.query(
            `SELECT * FROM pets WHERE id=$1`,
            [id]
        );
        const pet = res.rows[0];
        if(!pet) throw new ExpressError('Could not find that pet', 404)
        const user = await db.query(`SELECT usr_id,username, usr_avt, last_login FROM users WHERE usr_id=$1`,[pet.usr_id])
        pet.user = user.rows[0]
        return pet;
    }

    static async create({pet_name,pet_img},usr_id) {
        await this.onlyTwoPets(usr_id);
        const dupCheck = await db.query(`SELECT pet_name FROM pets WHERE pet_name=$1`,[pet_name]);
        if (dupCheck.rows[0]){
            throw new ExpressError('There is already a pet with that name',500)
        }
        const happiness = 50;
        const pet_status = 'Happy';
        const last_fed = null;
        const last_play = null;
        const res = await db.query(
            `INSERT INTO pets
            (pet_name,happiness,pet_img,pet_status,last_fed,last_play,usr_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,[
                pet_name, happiness, pet_img, pet_status, last_fed, last_play, usr_id
            ]
        )
        const pet = res.rows[0];
        const user = await db.query(`SELECT username, usr_avt, last_login FROM users WHERE usr_id=$1`,[pet.usr_id]);
        pet.user = user.rows[0]
        return pet;
    }

    static async petInteract({action,amt},pet_id){
        const res = await db.query(
            `SELECT * FROM pets WHERE id=$1`,
            [pet_id]
        );
        const pet = res.rows[0];
        if(!pet) throw new ExpressError('Could not find that pet',404)
        let updateAmt; 
        let updateTime;
        if (action === 'hunger'){
            updateAmt = this.calcInc(pet.hunger,amt)
            updateTime = 'last_fed'
        } else {
            updateAmt = this.calcInc(pet.happiness,amt)
            updateTime = 'last_play'
        }
        let newPetInfo = await db.query(`UPDATE pets SET ${action}=$1,${updateTime}=CURRENT_DATE WHERE id=$2 RETURNING *`,[updateAmt, pet_id])
        let returnPet = newPetInfo.rows[0]
        let newStatus = await this.petStatusUpdate(returnPet)
        returnPet.pet_status = newStatus
        return {returnPet}
    }

    static async petDecline({stat,amt},pet_id){
        const res = await db.query(
            `SELECT * FROM pets WHERE id=$1`,
            [pet_id]
        );
        const pet = res.rows[0];
        if(!pet) throw new ExpressError('Could not find that pet',404)
        let declineAmt; 
        if (stat === 'hunger'){
            declineAmt = this.calcDec(pet.hunger,amt)
        } else {
            declineAmt = this.calcDec(pet.happiness,amt);
        }
        let newPetInfo = await db.query(`UPDATE pets SET ${stat}=$1 WHERE id=$2 RETURNING *`,[declineAmt, pet_id])
        let returnPet = newPetInfo.rows[0]
        await this.petStatusUpdate(returnPet)
        return true;
    }

    static async addExp({amt},pet_id){
        const res = await db.query(
            `SELECT * FROM pets WHERE id=$1`,
            [pet_id]
        );
        const pet = res.rows[0];
        if(!pet) throw new ExpressError('Could not find that pet',404)
        let newExp = await this.calcExpMove(pet,amt)
        const newPetInfo = await db.query(`UPDATE pets SET lvl_exp=$1 WHERE id=$2 RETURNING *`,[newExp, pet_id])
        return newPetInfo.rows[0]
    }

    static async lvlUp(pet){
        let newLvl = pet.pet_lvl +1;
        await db.query(`UPDATE pets SET pet_lvl=$1 WHERE id=$2`,[newLvl, pet.id])
    }

    static async calcExpMove(pet,amt){
        if (pet.lvl_exp+amt>=100){
            await this.lvlUp(pet)
            return (pet.lvl_exp+amt) - 100
        } else {
            return pet.lvl_exp+amt;
        }
    }

    static calcInc(start,amt){
        if (start+amt>=100){
            return 100;
        } else {
            return start+amt;
        }
    }

    static calcDec(start,amt){
        if (start-amt<=0){
            return 0;
        } else {
            return start-amt;
        }
    }

    static async petStatusUpdate(pet){
        let newStatus
        if (pet.hunger < 20 && pet.happiness < 20){
            newStatus = 'Neglected'
        }
        else if (pet.hunger < 50 && pet.happiness < 50){
            newStatus = 'Unhappy'
        }
        else if (pet.hunger < 50){
            newStatus = 'Hungry'
        }
        else if (pet.happiness < 50){
            newStatus = 'Bored'
        } else {
            newStatus = 'Happy'
        }
        await db.query(`UPDATE pets SET pet_status=$1 WHERE id=$2`,[newStatus, pet.id])
        return newStatus;
    }

    static async onlyTwoPets(usr_id){
        const pets = await db.query(`SELECT * FROM pets WHERE usr_id=$1`,[usr_id])
        if(pets.rows.length>=2) throw new ExpressError("Looks like you already have two pets",500)
        return true;
    }
}


module.exports = Pet;