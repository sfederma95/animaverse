process.env.NODE_ENV = 'test';
const ExpressError = require('../expressError');
const db = require('../db');
const Pet = require('./pet');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds, petIds} = require('./_testCommon')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('get all pets returns array of pet info', async function(){
    const pets= await Pet.getAll();
    expect(pets).toEqual([
        {
          id: petIds[0],
          pet_name: 'pet1',
          hunger: expect.any(Number),
          happiness: expect.any(Number),
          pet_lvl: 1,
          pet_img: 'img1',
          pet_status: expect.any(String),
          usr_id: userIds[0],
          user: expect.any(Object)
        },
        {
          id: petIds[1],
          pet_name: 'pet2',
          hunger: expect.any(Number),
          happiness: expect.any(Number),
          pet_lvl: 1,
          pet_img: 'img2',
          pet_status: expect.any(String),
          usr_id: userIds[1],
          user: expect.any(Object)
        }
      ])
})

test('get pet by id returns pet info', async function(){
    const pet= await Pet.getPet(petIds[0]);
    expect(pet).toEqual({
        id: petIds[0],
        pet_name: 'pet1',
        hunger: expect.any(Number),
        happiness: expect.any(Number),
        pet_lvl: 1,
        lvl_exp: 0,
        pet_img: 'img1',
        pet_status: expect.any(String),
        last_fed: null,
        last_play: null,
        usr_id: userIds[0],
        user: expect.any(Object)
      })
})

test('get pet by id throws error if id not found', async function(){
    try {
        const pet = await Pet.getPet(900000000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('create pet returns pet info if name not taken', async function(){
    const petInfo = {pet_name:'pet500',pet_img:'pet.png'}
    const pet= await Pet.create(petInfo,userIds[0])
    expect(pet).toEqual({
        id: expect.any(Number),
        pet_name: 'pet500',
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
      })
})

test('create pet throws error if name is taken', async function(){
    try {
        const petInfo = {pet_name:'pet1',pet_img:'pet.png'}
        const pet= await Pet.create(petInfo,userIds[0])
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('create pet throws error if user already has two pets', async function(){
    try {
        const petInfo = {pet_name:'pet500',pet_img:'pet.png'}
        const pet= await Pet.create(petInfo,userIds[0])
        const petInfo2 = {pet_name:'pet9000',pet_img:'pet.png'}
        await Pet.create(petInfo2,userIds[0])
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('pet decline alters pet stat of hunger', async function(){
    await Pet.petDecline(10,petIds[0],'hunger')
    const pet = await Pet.getPet(petIds[0])
    expect(pet).toEqual({
        id: petIds[0],
        pet_name: 'pet1',
        hunger: 40,
        happiness: 50,
        pet_lvl: 1,
        lvl_exp: 0,
        pet_img: 'img1',
        pet_status: expect.any(String),
        last_fed: null,
        last_play: null,
        usr_id: userIds[0],
        user: expect.any(Object)
      })
})

test('pet decline alters pet stat of happiness', async function(){
    await Pet.petDecline(10,petIds[0],'happiness')
    const pet = await Pet.getPet(petIds[0])
    expect(pet).toEqual({
        id: petIds[0],
        pet_name: 'pet1',
        hunger: 50,
        happiness: 40,
        pet_lvl: 1,
        lvl_exp: 0,
        pet_img: 'img1',
        pet_status: expect.any(String),
        last_fed: null,
        last_play: null,
        usr_id: userIds[0],
        user: expect.any(Object)
      })
})

test('pet decline throws error if pet id not found', async function(){
    try {
        await Pet.petDecline(10,90000,'hunger')
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('pet decline: stat does not drop below 0', async function(){
    await Pet.petDecline(100,petIds[0],'happiness')
    const pet = await Pet.getPet(petIds[0])
    expect(pet).toEqual({
        id: petIds[0],
        pet_name: 'pet1',
        hunger: 50,
        happiness: 0,
        pet_lvl: 1,
        lvl_exp: 0,
        pet_img: 'img1',
        pet_status: expect.any(String),
        last_fed: null,
        last_play: null,
        usr_id: userIds[0],
        user: expect.any(Object)
      })
})

test('add exp to current pet exp if id is found', async function(){
    const pet = await Pet.addExp({amt:10},petIds[0])
    expect(pet).toEqual({
        id: petIds[0],
        pet_name: 'pet1',
        hunger: expect.any(Number),
        happiness: expect.any(Number),
        pet_lvl: 1,
        lvl_exp: 10,
        pet_img: 'img1',
        pet_status: expect.any(String),
        last_fed: null,
        last_play: null,
        usr_id: userIds[0],
      })
})

test('add exp throws error if id not found', async function(){
    try {
        const pet = await Pet.addExp({amt:10},9000000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('add exp levels up pet if exp exceeds 100', async function(){
    const pet = await Pet.addExp({amt:110},petIds[0])
    expect(pet).toEqual({
        id: petIds[0],
        pet_name: 'pet1',
        hunger: expect.any(Number),
        happiness: expect.any(Number),
        pet_lvl: 2,
        lvl_exp: 10,
        pet_img: 'img1',
        pet_status: expect.any(String),
        last_fed: null,
        last_play: null,
        usr_id: userIds[0],
      })
})

test('pet interact returns the updated pet info with increased stats: hunger', async function(){
    const pet = await Pet.petInteract({amt:10,item_id:1},petIds[0],userIds[0],'hunger')
    expect(pet).toEqual({
        returnPet: {
          id: petIds[0],
          pet_name: 'pet1',
          hunger: 60,
          happiness: 50,
          pet_lvl: 1,
          lvl_exp: 0,
          pet_img: 'img1',
          pet_status: 'Happy',
          last_fed: expect.any(Date),
          last_play: null,
          usr_id: userIds[0]
        }
      })
})

test('pet interact returns the updated pet info with increased stats: happiness', async function(){
    const pet = await Pet.petInteract({amt:10,item_id:1},petIds[0],userIds[0],'happiness')
    expect(pet).toEqual({
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
          last_play: expect.any(Date),
          usr_id: userIds[0]
        }
      })
})

test('pet interact throws error for pet id not found', async function(){
    try {
        await Pet.petInteract({amt:10,item_id:1},900000,userIds[0],'happiness')
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('pet interact throws error for item that does not exist in user inventory', async function(){
    try {
        await Pet.petInteract({amt:10,item_id:9000},petIds[0],userIds[0],'happiness')
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})