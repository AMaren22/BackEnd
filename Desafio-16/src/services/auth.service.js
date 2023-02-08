import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local'
import { getUser, getUserByID, newUser } from "../db/mongoDB/mongodb.js";


const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const signup = async (req, email, password, done) =>{
    try{
        const data = await newUser(email, password)
        return done(null, data)
    }catch(error){
        return done(null, false, {message: 'El usuario ya existe'})
    }
}

const login = async (req, email, password, done) =>{
    try{
        const user = await getUser(email)
        
        if(!user){
            return done(null, false, {message: 'User not found'})
        }else{
            const match = await user.matchPassword(password)
            match ? done(null, user) : done(null, false)
        }
    }catch{
        return done(null, false, {message: 'Error inesperado'})
    }
}

export const loginFunc = new LocalStrategy(strategyOptions, login)
export const signUpFunc = new LocalStrategy(strategyOptions, signup)

passport.serializeUser((user,done) =>{
    done(null, user._id)
})

passport.deserializeUser(async (userId,done) =>{
    try{
        const user = await getUserByID(userId)
        return done(null, user)
    }catch{
        return done(null, false, {message: 'Error inesperado'})
    }
})