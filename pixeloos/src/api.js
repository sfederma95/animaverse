import axios from 'axios';

require('dotenv').config();

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const DEV_APPROVAL_KEY = process.env.REACT_APP_DEV_APPROVAL_KEY || 'thissupersecretkeyfornow';

class AnimalsApi {
    static token;
    static async login(data){
        let res = await axios.post(`/users/login`,data)
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.user
    }
    static async register(data){
        let res = await axios.post(`/users/new`,data)
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.user
    }
    static async getUser(usr_id) {
        try {
            let res = await axios.get(`/users/${usr_id}`,{
                headers: {
                    Authorization: `Bearer ${AnimalsApi.token}`
                }
            })
            const itemMap = {};
            for (let i of res.data.user.inventory) {
                if (!itemMap[i.item_id]) {
                  itemMap[i.item_id]=1;
                }
                else itemMap[i.item_id] ++; 
            }
            res.data.user['items']=itemMap;
            return res.data.user;
        } catch(err){
            let msg = err.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg]
        }
    }
    static async addGold(usr_id, gold){
        let data = {usr_id:usr_id, goldToAdd: gold, devKey: DEV_APPROVAL_KEY}
        let res = await axios.put(`/gold/add`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.updatedUser;
    }
    static async newPet(data,usr_id){
        let res = await axios.post(`/pets/new/${usr_id}`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.user
    }
    static async buyItem(data, usr_id, goldDec){
        data.devKey = DEV_APPROVAL_KEY;
        let res = await axios.post(`/inventories/add`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        let res2 = await axios.put(`/gold/dec`,{usr_id:usr_id, goldToDec: goldDec},{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        if (res2.data.error){
            throw res2.data.error.msg
        }
        return res.data.newInv;
    }
    static async feedPet(data, usr_id, pet_id){
        let res = await axios.put(`/pets/${usr_id}/${pet_id}/feed`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.pet;
    }
    static async playPet(data, usr_id, pet_id){
        let res = await axios.put(`/pets/${usr_id}/${pet_id}/play`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.pet;
    }
    static async removeItem(data){
        const headers = {
            Authorization: `Bearer ${AnimalsApi.token}`
          }
        let res = await axios.delete(`/inventories/remove`, {headers,data});
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.newInv;
    }

    static async addExp(data, pet_id, usr_id){
        data.devKey = DEV_APPROVAL_KEY;
        let res = await axios.put(`/pets/${usr_id}/${pet_id}/exp`,data,{
            headers: {
                Authorization: `Bearer ${AnimalsApi.token}`
            }
        })
        if (res.data.error){
            throw res.data.error.msg
        }
        return res.data.pet;
    }

}


export default AnimalsApi