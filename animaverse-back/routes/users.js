const express = require('express');
const User = require('../models/user');
const jsonschema = require('jsonschema')
const newUserSchema = require('../schema/newUser.json')
const userLoginSchema = require('../schema/userLogin.json');
const userUpdateSchema = require('../schema/updateUser.json');
const ExpressError = require('../expressError');
const {createToken} = require('../helpers/token')
const {ensureCorrectUser,authenticateJWT} = require('../helpers/auth')
const router = express.Router();

router.post('/new', async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body,newUserSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e=>e.stack);
            throw new ExpressError(errs)
        }
        const user = await User.register(req.body)
        const token = createToken(user)
        user.token = token;
        return res.status(201).json({user})
    } catch(err){
        return next(err)
    }
})

router.post('/login', async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body,userLoginSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e=>e.stack);
            throw new ExpressError(errs)
        }
        const user = await User.authenticate(req.body)
        const token = createToken(user)
        user.token = token;
        return res.status(201).json({user})
    } catch(err){
        return next(err)
    }
})

router.get('/:id', authenticateJWT, ensureCorrectUser, async function(req,res,next){
    try {
        const user = await User.get(req.params.id)
        return res.json({user})
    } catch(err){
        return next(err)
    }
})

router.get('/', authenticateJWT, async function(req,res,next){
    try {
        const users = await User.getAll()
        return res.json({users})
    } catch(err){
        return next(err)
    }
})

router.patch('/:id', authenticateJWT, ensureCorrectUser, async function(req,res,next){
    try {
        const validator = jsonschema.validate(req.body,userUpdateSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e=>e.stack);
            throw new ExpressError(errs)
        }
        const user = await User.update(req.body, req.params.id)
        return res.json({user})
    } catch(err){
        return next(err)
    }
})

module.exports = router;