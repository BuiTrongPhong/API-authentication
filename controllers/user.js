
const User = require('../models/User')
const Audio = require('../models/Audio')
const Joi = require('joi')
const { findOne } = require('../models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/index')

const encodeToken = (userId) => {
    return  jwt.sign({
        iss: 'Phong',
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3 )
    }, JWT_SECRET)
}
// way callback
// const index = (req, res, next) => {
//     User.find({},(error, users) => {
//         if(error) next(error)
//         return res.status(200).json({users})
//     })
// }


// const newUser = (req, res, next) => {
//     // console.log('req.body', req.body)
//     const newUser = new User(req.body)
//     newUser.save((err, user) => {
//         console.log(user)
//         console.log(err)
//         return res.status(201).json(user)
//     })
// }

// way pormise

// const index = (req, res, next) => {
//     User.find()
//     .then((users) => {
//         return res.status(200).json({users})
//     })
//     .catch((err => next(err)))
// }
// const newUser = (req, res, next) => {
//     const newUser = new User(req.body)
//     console.log(newUser)
//     newUser.save()
//         .then(user => {
//             return res.status(201).json(user)
//         })
//         .catch(err => next(err))
// }
const index = async (req, res, next) => {
    try {
        const users = await User.find()
        // throw new Error('test loi function index')
        return res.status(200).json({ users })
    } catch (error) {
        next(error)
    }
}
const createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.value.body)
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        next(error) 
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.value.params.userId
        const deleteUser = await User.findById(userId)
    } catch (error) {
        next(error)
    }
}
const getUser = async (req, res, next) => {
    try {
        const userId = req.value.params.userId
        const user = await User.findById(userId)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
const replaceUser = async (req, res, next) => {
    try {
        const { userId } = req.value.params
        const newUser = req.value.body
        console.log(newUser)
        const result = await User.findByIdAndUpdate(userId, newUser)
        return res.status(200).json('sucsses')
    } catch (error) {
        next(error)
    }
}
const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.value.params
        const newUser = req.body
        console.log(newUser)
        const result = await User.findOneAndUpdate(userId, newUser)
        return res.status(200).json('sucsses')

    } catch (error) {
        next(error)
    }
}
const getUserAudio = async (req, res, next) => {
    try {
        const { userId } = req.value.params
        const user = await User.findById(userId).populate('audio')
        const userAudio = user.audio
        return res.status(200).json({ userAudio: user })
    } catch (error) {
        next(error)
    }
}
const createUserAudio = async (req, res, next) => {
    try {
        const newAudio = new Audio(req.value.body)
        const { userId } = req.value.params
        const user = await User.findById(userId)
        newAudio.owner = user
        await newAudio.save()

        user.audio.push(newAudio._id)
        await user.save()

        return res.status(201).json(newAudio)
    } catch (error) {
        next(error)
    }

}
const signIn = async (req, res, next) => {
    const token = encodeToken(req.user._id)
    res.setHeader('Authorization', token)
    res.status(200).json({susses: true})
}
const signUp = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ email: req.value.body.email })
        if(foundUser){
            return res.status(403).json({message: 'email already used'})
        }
        const newUser = new User(req.value.body)
        newUser.save()
        const token = encodeToken(newUser._id)
        res.setHeader('Authorization', token)
        return res.status(201).json('successful')

    } catch (error) {
        next(error)
    }
}
const secret = async () => {
    console.log('secret')
}
module.exports = { index, createUser, deleteUser, getUser, replaceUser, updateUser, getUserAudio, createUserAudio, signIn, signUp, secret }