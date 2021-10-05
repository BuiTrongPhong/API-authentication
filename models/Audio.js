const mongoose = require('mongoose')
const Schema = mongoose.Schema

const audioSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
    // ,
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
    
})
const Audio = mongoose.model('Audio', audioSchema)
module.exports = Audio