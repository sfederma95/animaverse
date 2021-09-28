const express = require('express');
const cors = require('cors')
const path = require('path');
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const goldRoutes = require('./routes/gold');
const inventoryRoutes = require('./routes/inventories');
const Pet = require('./models/pet')
const cron = require('node-cron')

const app = express();
app.use(cors())
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../pixeloos/build')));

app.use('/users',userRoutes)
app.use('/pets',petRoutes)
app.use('/gold',goldRoutes)
app.use('/inventories',inventoryRoutes)

app.use((req, res, next) => {
    res.status(200).json('Hello');
    next({
        status: 404,
        msg: 'Not Found',
    });
});

app.use(function(err,req,res,next){
    const msg = err.msg
    const status = err.status
    return res.status(status).json({
        error: {msg,status}
    })
})

cron.schedule('0 */4 * * *', async () => {
    const petsArr = await Pet.getAll()
    petsArr.map(async (p)=>{
        await Pet.petDecline(5, p.id, "happiness")
        await Pet.petDecline(5, p.id, "hunger")
    })
    let timestamp = new Date();
    console.log(`Pets updated at ${timestamp}`)
})

module.exports = app;