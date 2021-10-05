const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    userName: {
        type: String 
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    audio: [{
        type: Schema.Types.ObjectId,
        ref: 'Audio'
    }]
})
const User = mongoose.model('User',UserSchema)
module.exports = User