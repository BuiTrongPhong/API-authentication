const Joi = require('joi')
const { schema } = require('../models/User')
const validateBody = (schema) => {
    return (req, res, next) => {
        const validateResult = schema.validate(req.body)
        if (validateResult.error) {
            return res.status(400).json(validateResult.error)
        } else {
            if  (!req.value) req.value = {}
            if  (!req.value['body']) req.value['body'] = {}
            req.value.body = validateResult.value
            next()
        }
    }
}
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validateResult = schema.validate({
            param: req.params[name]
        })
        if(validateResult.error) {
            return res.status(400).json(validateResult.error)
        } else {
            if  (!req.value) req.value = {}
            if  (!req.value['params']) req.value['params'] = {}
            req.value.params[name] = validateResult.value.param
            next()
        }
    }
}
const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    userSchema: Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),

    }),
    updateUserSchema: Joi.object().keys({
        userName: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),

    }),
    audioSchema: Joi.object().keys({
        name: Joi.string().required(),
        decription: Joi.string().required(),
    })

}
module.exports = {
    validateBody,
    validateParam,
    schemas
}