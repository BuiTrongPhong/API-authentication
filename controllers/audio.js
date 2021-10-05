const User = require('../models/User')
const Audio = require('../models/Audio')

const index = async (req, res, next) => {
    try {
        const audios = await Audio.find()
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