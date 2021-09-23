process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds, tokens} = require('./_testCommon')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('add gold works for correct user', async function(){
    const res = await request(app).put(`/gold/add`).send({usr_id:userIds[0],goldToAdd:500}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        updatedUser: {
          updatedUser: {
            usr_id: userIds[0],
            username: 'user1',
            gold_amt: 1000,
            usr_avt: null,
            last_login: expect.any(String),
            pets: expect.any(Array),
            inventory: expect.any(Array)
          }
        }
      })
})

test('add gold returns 401 for incorrect user', async function(){
    const res = await request(app).put(`/gold/add`).send({usr_id:userIds[0],goldToAdd:500}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('dec gold works for correct user', async function(){
    const res = await request(app).put(`/gold/dec`).send({usr_id:userIds[0],goldToDec:500}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        goldUpdate: {
          updatedUser: {
            usr_id: userIds[0],
            username: 'user1',
            gold_amt: 0,
            usr_avt: null,
            last_login: expect.any(String),
            pets: expect.any(Array),
            inventory: expect.any(Array)
          }
        }
      })
})

test('dec gold returns 401 for incorrect user', async function(){
    const res = await request(app).put(`/gold/dec`).send({usr_id:userIds[0],goldToAdd:500}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('dec gold returns 500 for not enough gold', async function(){
    const res = await request(app).put(`/gold/dec`).send({usr_id:userIds[0],goldToAdd:501}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.statusCode).toEqual(500);
})