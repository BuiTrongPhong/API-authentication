require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const userRoute = require('./routes/user.js')
const audioRoute = require('./routes/audio.js')
const mongoose = require('mongoose')
const helmet = require('helmet')
const { route } = require('./routes/user.js')
// setup connect mongodb by mongoose 
const passport = require('passport')

mongoose.connect('mongodb://localhost/listenkeyboard1')
    .then(() => console.log('connected to mogodb'))
    .catch((error) => console.error(`connnect is failed with error which is :${error}`))
const app = express()
app.use(helmet())
app.use(passport.initialize())

// middleware
app.use(logger('dev'))
app.use(express.json())
//routes
app.get('/', (req, res, next) => {
    
    return res.status(200).json({
        message: 'home'
    })
})
app.use('/users',userRoute)
    
app.use('/audios',audioRoute)
//error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
//error handler
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    //response to client
    return res.status(status).json({
        error: {
            message: error.toString()
        }
    })
})
//start server

const port = app.get('port') || 3000
app.listen(port, () => console.log(`server is listening on ${port}`))