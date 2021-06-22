import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
const DEV_APPROVAL_KEY = process.env.DEV_APPROVAL_KEY || 'thissupersecretkeyfornow'

class AnimalsApi {
    static token;
    static async login(data){
        try{
            let res = await axios.post(`${BASE_URL}/users/login`,data)
            return res.user
        } catch(err){
            throw Error(err)
        }
    }
    static async register(data){
        try{
            let res = await axios.post(`${BASE_URL}/users/new`,data)
            return res.user
        } catch(err){
            throw Error(err)
        }
    }
    static async getUser(usr_id) {
        try {
            let res = await axios.get(`${BASE_URL}/users/${usr_id}`,{
                headers: {
                    Authorization: `Bearer ${AnimalsApi.token}`
                }
            })
            return res.user;
        } catch(err){
            throw Error(err)
        }
    }
}


export default AnimalsApi