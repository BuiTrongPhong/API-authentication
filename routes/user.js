const express = require('express')
const { required } = require('joi')
const UserController = require('../controllers/user.js')
const router = express.Router()
const {validateBody, validateParam, schemas} = require('../middleware/validateRouter')
router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.createUser)
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUser)
    .put(validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema), UserController.replaceUser)
    .patch(validateBody(schemas.updateUserSchema), UserController.updateUser)
    .delete(UserController.deleteUser)
router.route('/:userId/audios')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUserAudio)
    .post(validateParam(schemas.idSchema, 'userId'), validateBody(schemas.audioSchema), UserController.createUserAudio)
module.exports = router