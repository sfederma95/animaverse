process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds, tokens} = require('./_testCommon')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('add to inventory works for correct user', async function(){
    const res = await request(app).post(`/inventories/add`).send({usr_id:userIds[0],item_id:2}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        newInv: {
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

test('add to inventory returns 401 for incorrect user', async function(){
    const res = await request(app).post(`/inventories/add`).send({usr_id:userIds[0],item_id:2}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('remove from inventory works for correct user', async function(){
    const res = await request(app).delete(`/inventories/remove`).send({usr_id:userIds[0],item_id:1}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        newInv: {
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

test('remove from inventory returns 401 for incorrect user', async function(){
    const res = await request(app).delete(`/inventories/remove`).send({usr_id:userIds[0],item_id:2}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('remove from inventory returns 500 for invalid item id', async function(){
    const res = await request(app).delete(`/inventories/remove`).send({usr_id:userIds[0],item_id:9000}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.statusCode).toEqual(500);
})