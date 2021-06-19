const express = require('express');
const Inventory = require('../models/inventory');
const User = require('../models/user')
const router = express.Router();

router.post('/add',async function(req,res,next){
    try {
        await Inventory.addToInv(req.body.usr_id, req.body.item_id);
        const newInv = await User.get(req.body.usr_id);
        return res.status(201).json({newInv})
    }
    catch(err){
        return next(err)
    }
})

router.delete('/remove',async function(req,res,next){
    try {
        await Inventory.removeFromInv(req.body.usr_id, req.body.item_id);
        const newInv = await User.get(req.body.usr_id)
        return res.status(201).json({newInv})
    }
    catch(err){
        return next(err)
    }
})

module.exports = router;