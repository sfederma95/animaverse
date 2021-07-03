process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds, tokens, petIds} = require('./_testCommon')
const {DEV_APPROVAL_KEY} = require('../config')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('get all pets works for user w/ valid token', async function(){
    const res = await request(app).get('/pets').set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        pets: [
          {
            id: petIds[0],
            pet_name: 'pet1',
            hunger: 50,
            happiness: 50,
            pet_lvl: 1,
            pet_img: 'img1',
            pet_status: 'Happy',
            usr_id: userIds[0],
            user: expect.any(Object)
          },
          {
            id: petIds[1],
            pet_name: 'pet2',
            hunger: 50,
            happiness: 50,
            pet_lvl: 1,
            pet_img: 'img2',
            pet_status: 'Happy',
            usr_id: userIds[1],
            user: expect.any(Object)
          }
        ]
      })
})

test('get all pets returns 401 for anon user', async function(){
    const res = await request(app).get('/pets');
    expect(res.statusCode).toEqual(401);
})

test('get pet works for correct pet owner', async function(){
    const res = await request(app).get(`/pets/${userIds[0]}/${petIds[0]}`).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        pet: {
          id: petIds[0],
          pet_name: 'pet1',
          hunger: 50,
          happiness: 50,
          pet_lvl: 1,
          lvl_exp: 0,
          pet_img: 'img1',
          pet_status: 'Happy',
          last_fed: null,
          last_play: null,
          usr_id: userIds[0],
          user: expect.any(Object)
        }
      })
})

test('get pet returns 401 for incorrect user', async function(){
    const res = await request(app).get(`/pets/${userIds[0]}/${petIds[0]}`).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})


test('get pet returns 401 for anon user', async function(){
    const res = await request(app).get(`/pets/${userIds[0]}/${petIds[0]}`)
    expect(res.statusCode).toEqual(401);
})

test('add exp route works for correct user, and provided dev approval key', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/exp`).send({devKey:DEV_APPROVAL_KEY,amt:50}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        pet: {
          id: petIds[0],
          pet_name: 'pet1',
          hunger: 50,
          happiness: 50,
          pet_lvl: 1,
          lvl_exp: 50,
          pet_img: 'img1',
          pet_status: 'Happy',
          last_fed: null,
          last_play: null,
          usr_id: userIds[0]
        }
      })
})

test('add exp returns 401 for incorrect user', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/exp`).send({devKey:DEV_APPROVAL_KEY,amt:50}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('add exp returns 500 for no dev key provided', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/exp`).send({amt:50}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(500);
})

test('feed pet works for valid user and valid item id in inventory', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/feed`).send({amt:10,item_id:1}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        pet: {
          returnPet: {
            id: petIds[0],
            pet_name: 'pet1',
            hunger: 60,
            happiness: 50,
            pet_lvl: 1,
            lvl_exp: 0,
            pet_img: 'img1',
            pet_status: 'Happy',
            last_fed: expect.any(String),
            last_play: null,
            usr_id: userIds[0]
          }
        }
      })
})

test('feed pet returns 401 for invalid user', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/feed`).send({amt:10,item_id:1}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('play with pet works for valid user and valid item id in inventory', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/play`).send({amt:10,item_id:1}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        pet: {
          returnPet: {
            id: petIds[0],
            pet_name: 'pet1',
            hunger: 50,
            happiness: 60,
            pet_lvl: 1,
            lvl_exp: 0,
            pet_img: 'img1',
            pet_status: 'Happy',
            last_fed: null,
            last_play: expect.any(String),
            usr_id: userIds[0]
          }
        }
      })
})

test('play with pet returns 401 for invalid user', async function(){
    const res = await request(app).put(`/pets/${userIds[0]}/${petIds[0]}/play`).send({amt:10,item_id:1}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('create pet works for correct user with valid inputs', async function(){
    const res = await request(app).post(`/pets/new/${userIds[0]}`).send({pet_name:'newpet',pet_img:'pet.png'}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.body).toEqual({
        pet: {
          id: expect.any(Number),
          pet_name: 'newpet',
          hunger: 50,
          happiness: 50,
          pet_lvl: 1,
          lvl_exp: 0,
          pet_img: 'pet.png',
          pet_status: 'Happy',
          last_fed: null,
          last_play: null,
          usr_id: userIds[0],
          user: expect.any(Object)
        }
      })
})

test('create pet returns 401 for incorrect user', async function(){
    const res = await request(app).post(`/pets/new/${userIds[0]}`).send({pet_name:'newpet',pet_img:'pet.png'}).set('authorization',`Bearer ${tokens[1]}`)
    expect(res.statusCode).toEqual(401);
})

test('create pet returns 500 for missing required fields', async function(){
    const res = await request(app).post(`/pets/new/${userIds[0]}`).send({pet_name:'newpet'}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.statusCode).toEqual(500);
})


test('create pet returns 500 for extra fields in request', async function(){
    const res = await request(app).post(`/pets/new/${userIds[0]}`).send({pet_name:'newpet',pet_img:'pet.png', color:'purple'}).set('authorization',`Bearer ${tokens[0]}`)
    expect(res.statusCode).toEqual(500);
})