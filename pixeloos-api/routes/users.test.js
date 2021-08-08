process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds, tokens} = require('./_testCommon')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('get all users works for user w/ valid token', async function(){
    const res = await request(app).get('/users').set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        users: [
          {
            usr_id: userIds[0],
            username: 'user1',
            usr_avt: null,
            last_login: expect.any(String),
            pets: expect.any(Array)
          },
          {
            usr_id: userIds[1],
            username: 'user2',
            usr_avt: null,
            last_login: expect.any(String),
            pets: expect.any(Array)
          }
        ]
      })
})

test('get all users returns 401 for anon user', async function(){
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(401);
})

test('get user works for user w/ valid token for user', async function(){
    const res = await request(app).get(`/users/${userIds[0]}`).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        user: {
          usr_id: userIds[0],
          username: 'user1',
          gold_amt: 500,
          usr_avt: null,
          last_login: expect.any(String),
          pets: expect.any(Array),
          inventory: expect.any(Array)
        }
      })
})

test('get user returns 401 for wrong user token', async function(){
    const res = await request(app).get(`/users/${userIds[0]}`).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('create new user for valid values passed in', async function(){
    const res = await request(app).post(`/users/new`).send({username: 'testuser',password:'testpassword',email:'someemail@yahoo.com'})
    expect(res.body).toEqual({
        user: {
          usr_id: expect.any(Number),
          username: 'testuser',
          gold_amt: 500,
          usr_avt: 'https://cdn4.iconfinder.com/data/icons/user-interface-glyph-5/32/User-512.png',
          last_login: expect.any(String),
          token: expect.any(String)
        }
      })
})

test('create returns 500 for username already taken', async function(){
    const res = await request(app).post(`/users/new`).send({username: 'user1',password:'testpassword',email:'someemail@yahoo.com'})
    expect(res.statusCode).toEqual(500);
})

test('create returns 500 for fields missing', async function(){
    const res = await request(app).post(`/users/new`).send({username: 'testuser',email:'someemail@yahoo.com'})
    expect(res.statusCode).toEqual(500);
})

test('login user for valid username and password', async function(){
    const res = await request(app).post(`/users/login`).send({username: 'user1',password:'password1'})
    expect(res.body).toEqual({user:{
        usr_id: expect.any(Number),
        username: 'user1',
        gold_amt: 500,
        usr_avt: null,
        last_login: expect.any(String),
        pets: expect.any(Array),
        inventory: expect.any(Array),
        token: expect.any(String)
      }})
})

test('login returns 500 for incorrect password', async function(){
    const res = await request(app).post(`/users/login`).send({username: 'user1',password:'password123'})
    expect(res.statusCode).toEqual(500);
})

test('login returns 500 for non-existant user', async function(){
    const res = await request(app).post(`/users/login`).send({username: 'notauser',password:'password1'})
    expect(res.statusCode).toEqual(500);
})

test('login returns 500 for sending extra data in request', async function(){
    const res = await request(app).post(`/users/login`).send({username: 'notauser',password:'password1',color:'purple'})
    expect(res.statusCode).toEqual(500);
})

test('patch works for valid fields and valid token', async function(){
    const res = await request(app).patch(`/users/${userIds[0]}`).send({email: 'newemail@yahoo.com'}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        user: {
          usr_id: userIds[0],
          username: 'user1',
          usr_avt: null,
          email: 'newemail@yahoo.com'
        }
      })
})

test('patch returns 401 for invalid token passed for user_id', async function(){
    const res = await request(app).patch(`/users/${userIds[0]}`).send({email: 'newemail@yahoo.com'}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('patch returns 500 for invalid email format', async function(){
    const res = await request(app).patch(`/users/${userIds[0]}`).send({email: 'newemail'}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.statusCode).toEqual(500);
})

test('patch returns 500 for invalid key color passed in req body', async function(){
    const res = await request(app).patch(`/users/${userIds[0]}`).send({color:'purple'}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.statusCode).toEqual(500);
})