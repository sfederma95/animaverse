const express = require('express');
const jsonschema = require('jsonschema')
const newPetSchema = require('../schema/newPet.json')
const ExpressError = require('../expressError');
const {ensureCorrectUser,authenticateJWT, ensureDevAuth} = require('../helpers/auth')
const Pet = require('../models/pet');
const router = express.Router();

router.get('/', authenticateJWT, async function(req,res,next){
    try {
        const pets = await Pet.getAll()
        return res.json({pets})
    } catch(err){
        return next(err)
    }
})


router.get('/:id/:pet_id', authenticateJWT, ensureCorrectUser,async function(req,res,next){
    try {
        const pet = await Pet.getPet(req.params.pet_id)
        return res.json({pet})
    } catch(err){
        return next(err)
    }
})

router.put('/:id/:pet_id/exp', ensureDevAuth,authenticateJWT, ensureCorrectUser,async function(req,res,next){
    try {
        const pet = await Pet.addExp(req.body,req.params.pet_id)
        return res.json({pet})
    } catch(err){
        return next(err)
    }
})

router.put('/:id/:pet_id/feed', authenticateJWT, ensureCorrectUser, async function(req,res,next){
    try {
        const action = 'hunger'
        const pet = await Pet.petInteract(req.body,req.params.pet_id, req.params.id, action)
        return res.json({pet})
    } catch(err){
        return next(err)
    }
})

router.put('/:id/:pet_id/play', authenticateJWT, ensureCorrectUser, async function(req,res,next){
    try {
        const action = 'happiness'
        const pet = await Pet.petInteract(req.body,req.params.pet_id, req.params.id, action)
        return res.json({pet})
    } catch(err){
        return next(err)
    }
})

router.post('/new/:id', authenticateJWT, ensureCorrectUser,async function(req,res,next){
    try {
        const validator = jsonschema.validate(req.body,newPetSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e=>`${e.path[0]} ${e.message}`);
            throw new ExpressError(errs,500)
        }
        const pet = await Pet.create(req.body,req.params.id)
        return res.status(201).json({pet})
    } catch(err){
        return next(err)
    }
})

module.exports = router;