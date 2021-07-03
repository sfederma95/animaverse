const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config')
const {createToken} = require('./token')

const user = {username:'testuser',usr_id:1}

test("creating a token works and when verified should have a payload of username and id",function(){
    const token = createToken(user)
    const payload = jwt.verify(token, SECRET_KEY);
    expect (payload).toEqual({
        iat: expect.any(Number),
        username: 'testuser',
        id: 1
    })
})

test("should return false if either username or id is missing",function(){
    const user2 = {username:'testuser1'}
    const payload = createToken(user2)
    expect(payload).toEqual(false)
})