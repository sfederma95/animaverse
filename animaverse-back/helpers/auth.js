const jwt = require('jsonwebtoken');
const {SECRET_KEY, DEV_APPROVAL_KEY} = require('../config');
const ExpressError = require('../expressError');

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            res.locals.user = jwt.verify(token,SECRET_KEY)
            return next();
        }
        throw new ExpressError("Unauthorized to make that request",401);
    } catch(err){
        return next(err);
    }
};

const ensureCorrectUser = (req,res,next) => {
    try {
        const user = res.locals.user;
        if(user.id !== +req.params.id && user.id !== +req.body.usr_id){
            throw new ExpressError("Unauthorized to make that request",401);
        } 
        return next();
    } catch(err){
        return next(err)
    }
}

const ensureDevAuth = (req,res,next)=>{
    try {
        const devAuth = req.body.devKey;
        if (devAuth !== DEV_APPROVAL_KEY){
            throw new ExpressError("Only the developer can use this API route")
        }
        return next();
    } catch(err){
        return next(err)
    }
}

module.exports = {
    authenticateJWT,
    ensureCorrectUser,
    ensureDevAuth
}