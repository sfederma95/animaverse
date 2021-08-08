process.env.NODE_ENV = 'test';
const ExpressError = require('../expressError');
const db = require('../db');
const Inventory = require('./inventory');
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, userIds} = require('./_testCommon')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

test('get inventory throws error if usr_id is not found', async function(){
    try {
        const inv = await Inventory.getInventory(90000000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('get inventory by user id returns array of inventory objects',async function(){
    const inv = await Inventory.getInventory(userIds[0])
    expect(inv).toEqual([ { item_id: 1 } ])
})

test('remove from inventory returns new array of items minus the item removed',async function(){
    const inv = await Inventory.removeFromInv(userIds[0],1)
    expect(inv).toEqual([])
})

test('remove inventory throws error if user not found', async function(){
    try {
        await Inventory.removeFromInv(900000,1)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('remove inventory throws error if item_id does not exist in inventory', async function(){
    try {
        await Inventory.removeFromInv(userIds[0],9000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('add to inventory returns array of items in inventory',async function(){
    const inv = await Inventory.addToInv(userIds[0],2)
    expect(inv).toEqual([ { item_id: 1 }, {item_id:2} ])
})

test('add to inventory throws error for invalid item id', async function(){
    try {
        await Inventory.addToInv(userIds[0],9000)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})

test('add to inventory throws error for user not found', async function(){
    try {
        await Inventory.addToInv(90000,1)
    fail();
    } catch(err){
        expect(err instanceof ExpressError).toBeTruthy();
    }
})