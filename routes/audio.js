const express = require('express')
const AudioController = require('../controllers/audio')
const router = express.Router()

router.route('/')
    .get(AudioController.index)
    .post(AudioController.newAudio)
module.exports = router 