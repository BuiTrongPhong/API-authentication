const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
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
    }
    ,
    audio: [{
        type: Schema.Types.ObjectId,
        ref: 'Audio'
    }]
})
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcryptjs.genSalt(10)
        const passwordHash = await bcryptjs.hash(this.password, salt)
        this.password = passwordHash
        next()
    } catch (error) {
        next(error)
    }
})
UserSchema.methods.isValidatePassword = async function (inputpassword) {
    try {
        return await bcryptjs.compare(inputpassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}
const User = mongoose.model('User',UserSchema)
module.exports = User