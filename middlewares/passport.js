const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const User = require('../models/User')
const {ExtractJwt} = require('passport-jwt')
const { JWT_SECRET } = require('../configs/index')
const LocalStrategy = require('passport-local').Strategy
passport.use( new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorzation'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)   
        if(!user){
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        console.log(error)
        done(error, false)
    }
})) 
passport.use(new LocalStrategy({
    usernameField: 'email',

}, async (email, password, done) => {
    try {
        console.log(email)
        const user = await User.findOne({email})
        if(!user) return done(null, false)
        const isCorrectPassword = await user.isValidatePassword(password)
        if(!isCorrectPassword) return done(null, false)
        done(null, user)
    } catch (error) {
        done(error, false)
    }

} ))