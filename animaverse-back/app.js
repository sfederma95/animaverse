const express = require('express');
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const goldRoutes = require('./routes/gold');
const inventoryRoutes = require('./routes/inventories');
const Pet = require('./models/pet')
const {DEV_APPROVAL_KEY} = require('./config')
const cron = require('node-cron')
const axios = require('axios')

const app = express();
app.use(express.json());

app.use('/users',userRoutes)
app.use('/pets',petRoutes)
app.use('/gold',goldRoutes)
app.use('/inventories',inventoryRoutes)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.use(function(err,req,res,next){
    console.error(err.stack)
    const msg = err.msg
    const status = err.status
    return res.status(500).json({
        error: {msg,status}
    })
})

cron.schedule('* */4 * * *', async () => {
    const petsArr = await Pet.getAll()
    petsArr.map(async (p)=>{
        await Pet.petDecline(5, p.id, "happiness")
        await Pet.petDecline(5, p.id, "hunger")
    })
    let timestamp = new Date();
    console.log(`Pets updated at ${timestamp}`)
})

module.exports = app;