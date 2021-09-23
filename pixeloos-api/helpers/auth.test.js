const jwt = require('jsonwebtoken');
const {
    authenticateJWT,
    ensureCorrectUser,
} = require('./auth')
const {SECRET_KEY} = require('../config');

test ('authenticateJWT works through with authorization header', function(){
    const testJWT = jwt.sign({username:'testuser',id:1},SECRET_KEY);
    const req = {headers: {authorization: `Bearer ${testJWT}`}};
    const res = {locals: {}};
    const next = function (err){
        expect(err).toBeFalsy();
    }
    authenticateJWT(req,res,next);
    expect(res.locals).toEqual({
        user: {
            iat: expect.any(Number),
            username: 'testuser',
            id: 1
        }
    })
})

test ('authenticateJWT throws error for no auth header', function(){
    const req = {};
    const res = {locals: {}};
    const next = function (err){
        expect(err).toBeTruthy()
    }
    authenticateJWT(req,res,next)
})

test ('authenticateJWT throws error for invalid key in signing', function(){
    const testJWT = jwt.sign({username:'testuser',id:1},'wrong_key');
    const req = {headers: {authorization: `Bearer ${testJWT}`}};
    const res = {locals: {}};
    const next = function (err){
        expect(err).toBeTruthy()
    }
    authenticateJWT(req,res,next)
})

test ('corrent user can access', function(){
    const req = { params: {id: 1}}
    const res = {locals: {user:{id:1}}};
    const next = function (err){
        expect(err).toBeFalsy()
    }
    ensureCorrectUser(req,res,next)
})

test ('mismatching id can not access', function(){
    const req = { params: {id: 2}}
    const res = {locals: {user:{id:1}}};
    const next = function (err){
        expect(err).toBeTruthy()
    }
    ensureCorrectUser(req,res,next)
})
