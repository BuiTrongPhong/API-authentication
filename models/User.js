const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    audio: [{
        type: Schema.Types.ObjectId,
        ref: 'Audio'
    }]
})
const User = mongoose.model('User',UserSchema)
module.exports = User