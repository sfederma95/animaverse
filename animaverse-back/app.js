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

app.use(function(err,req,res,next){
    console.error(err.stack)
    const msg = err.msg
    const status = err.status
    return res.status(500).json({
        error: {msg,status}
    })
})

// cron.schedule('*/1 * * * *', async () => {
//     const idObj = {};
//     const petsArr = await Pet.getAll()
//     petsArr.map(p=>idObj[p.id]=p.usr_id)
//     for (i in idObj) {
//         await axios.put(`http://localhost:3001/pets/${idObj[i]}/${i}/boredom`,{stat:"happiness",amt:5, devKey:DEV_APPROVAL_KEY})
//         await axios.put(`http://localhost:3001/pets/${idObj[i]}/${i}/starve`,{stat:"hunger",amt:5, devKey:DEV_APPROVAL_KEY})
//     }
//     let timestamp = new Date();
//     console.log(`Pets updated at ${timestamp}`)
// })

module.exports = app;