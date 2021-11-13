const User = require('../models/User')
const Audio = require('../models/Audio')

const index = async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*")
        const audios = await Audio.find()
        console.log('a', res)
        return res.status(200).json({audios})
    } catch (error) {
        next(error)
    }
}
const newAudio = async(req, res, next) => {
    try {
        const newAudio = new Audio(req.body)
        await newAudio.save()
        return res.status(200).json('success')
    } catch (error) {
        next(error)
    }
}
module.exports = {
    index,
    newAudio
}