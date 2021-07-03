process.env.NODE_ENV = 'test';
const ExpressError = require('../expressError');
const db = require('../db');
const User = require('./user');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds} = require('./_testCommon')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('authentication method words w/ correct credentials', async function(){
    const user = await User.authenticate({username:'user1',password:'password1'});
    expect(user).toEqual(expect.objectContaining({
          username: 'user1',
          usr_id: userIds[0],
        }))
})

test('authentication method fails w/ incorrect credentials', async function(){
    try {
        const user = await User.authenticate({username:'user1',password:'wrong'});
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('getAll method returns all users', async function(){
    const users = await User.getAll();
    expect(users).toEqual([
        {
          usr_id: userIds[0],
          username: 'user1',
          usr_avt: null,
          last_login: expect.any(Date),
          pets: expect.any(Array)
        },
        {
          usr_id: userIds[1],
          username: 'user2',
          usr_avt: null,
          last_login: expect.any(Date),
          pets: expect.any(Array)
        }
      ])
})

test('get pets for usr_id will return pets if user found', async function(){
    const pets = await User.getPets(userIds[0]);
    expect(pets).toEqual([
        {
          id: expect.any(Number),
          pet_name: 'pet1',
          hunger: expect.any(Number),
          happiness: expect.any(Number),
          pet_lvl: 1,
          pet_img: 'img1',
          pet_status: expect.any(String),
          lvl_exp: 0,
          last_fed: null,
          last_play: null
        }
      ])
})

test('getPets throws error for usr_id not found', async function(){
    try {
        const pets = await User.getPets(9000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('get user returns a user w/ pets and inventory array', async function(){
    const user = await User.get(userIds[0]);
    expect(user).toEqual({
        usr_id: userIds[0],
        username: 'user1',
        gold_amt: 500,
        usr_avt: null,
        last_login: expect.any(Date),
        pets: expect.any(Array),
        inventory: expect.any(Array)
      })
})

test('get user throws an error for usr_id not found', async function(){
    try {
        const user = await User.get(9000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('register returns new user for unique username minus password', async function(){
    const user = {username: 'testuser',password:'testpassword',email:'someemail@yahoo.com'}
    const userReg = await User.register(user)
    expect(userReg).toEqual({
        usr_id: expect.any(Number),
        username: 'testuser',
        gold_amt: 500,
        usr_avt: 'https://cdn4.iconfinder.com/data/icons/user-interface-glyph-5/32/User-512.png',
        last_login: expect.any(Date)
      })
})

test('register throws error for taken username', async function(){
    try {
        const user = {username: 'user1',password:'testpassword',email:'someemail@yahoo.com'}
        await User.register(user)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('add gold to user, adds the amount of gold specified to base of 500', async function(){
    const user = await User.addGold(userIds[0],100)
    expect(user).toEqual({
        updatedUser: {
          usr_id: userIds[0],
          username: 'user1',
          gold_amt: 600,
          usr_avt: null,
          last_login: expect.any(Date),
          pets: expect.any(Array),
          inventory: expect.any(Array)
        }
      })
})

test('deduct gold from user, reduces amount of user gold by specified amount', async function(){
    const user = await User.decGold(userIds[0],100)
    expect(user).toEqual({
        updatedUser: {
          usr_id: userIds[0],
          username: 'user1',
          gold_amt: 400,
          usr_avt: null,
          last_login: expect.any(Date),
          pets: expect.any(Array),
          inventory: expect.any(Array)
        }
      })
})

test('add gold throws error for usr_id not found', async function(){
    try {
        await User.addGold(900000,100)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('dec gold throws error for usr_id not found', async function(){
    try {
        await User.decGold(900000,100)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('dec gold throws error when user gold reaches 0', async function(){
    try {
        await User.decGold(userIds[0],501)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('update email for user where usr_id is found', async function(){
    const update = {email:'someemail@yahoo.com'}
    const user = await User.update(update,userIds[0])
    expect(user).toEqual({
        usr_id: userIds[0],
        username: 'user1',
        usr_avt: null,
        email: 'someemail@yahoo.com'
      })
})

test('update avatar for user where usr_id is found', async function(){
    const update = {avatar:'something.png'}
    const user = await User.update(update,userIds[0])
    expect(user).toEqual({
        usr_id: userIds[0],
        username: 'user1',
        usr_avt: 'something.png',
        email: 'user1@yahoo.com'
      })
})

test('update throws error for usr_id not found', async function(){
    try {
        const update = {avatar:'something.png'}
        const user = await User.update(update,90000000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})
