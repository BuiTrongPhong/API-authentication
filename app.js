const express = require('express')
const logger = require('morgan')
const userRoute = require('./routes/user.js')
const audioRoute = require('./routes/audio.js')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { route } = require('./routes/user.js')
// setup connect mongodb by mongoose 

mongoose.connect('mongodb://localhost/listenkeyboard')
    .then(() => console.log('connected to mogodb'))
    .catch((error) => console.error(`connnect is failed with error which is :${error}`))
const app = express()
app.use(helmet())
// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
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
            message: error.message
        }
    })
})
//start server

const port = app.get('port') || 3000
app.listen(port, () => console.log(`server is listening on ${port}`))