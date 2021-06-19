const express = require('express');
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const goldRoutes = require('./routes/gold');
const inventoryRoutes = require('./routes/inventories');
const app = express();
app.use(express.json());
app.use('/users',userRoutes)
app.use('/pets',petRoutes)
app.use('/gold',goldRoutes)
app.use('/inventories',inventoryRoutes)

// app.use(function(req, res, next) {
//     return next(new ExpressError());
// });

app.use(function(err,req,res,next){
    console.error(err.stack)
    const msg = err.msg
    const status = err.status
    return res.status(500).json({
        error: {msg,status}
    })
})

module.exports = app;