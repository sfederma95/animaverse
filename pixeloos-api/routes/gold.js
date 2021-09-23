const express = require('express');
const User = require('../models/user');
const {ensureCorrectUser,authenticateJWT} = require('../helpers/auth')
const router = express.Router();

router.put('/add', authenticateJWT, ensureCorrectUser,async function(req,res,next){
    try{
        const updatedUser = await User.addGold(req.body.usr_id,req.body.goldToAdd)
        return res.status(201).json({updatedUser})
    } catch(err){
        return next(err)
    }
})

router.put('/dec', authenticateJWT, ensureCorrectUser, async function(req,res,next){
    try{
        const goldUpdate = await User.decGold(req.body.usr_id,req.body.goldToDec)
        return res.status(201).json({goldUpdate})
    } catch(err){
        return next(err)
    }
})

module.exports = router;