const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require('../config')

function createToken(user){
    if (!user.username || !user.usr_id) {
        return false;
    }
    let payload = {
        username: user.username,
        id: user.usr_id
    }
    return jwt.sign(payload,SECRET_KEY)
}

module.exports = {createToken}