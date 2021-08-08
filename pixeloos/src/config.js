require('dotenv').config();

const BASE_URL = process.env.REACT_APP_BASE_URL
const DEV_APPROVAL_KEY = process.env.REACT_APP_DEV_APPROVAL_KEY 

module.exports = {
    BASE_URL,
    DEV_APPROVAL_KEY
}