import { StrategyOptions, UsersBody } from "../utils/globals.interfaces";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";
import { UserModel } from "../DB/mongoDB/schema/user.schema";
import { logger } from "../config/logs.config";
import { userDao } from "../DB/mongoDB/daos/user.dao";


const strategyOptions: StrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const signup = async(req: Request, email: string, password: string, done:any) =>{
    try{
        const body: UsersBody = req.body
        let name = body.name
        let adress = body.adress
        let age = body.age
        let phone = body.phone
        let avatar = body.avatar
        let admin = body.admin
        const newUser = new UserModel({
            email,
            password,
            name,
            adress,
            age,
            phone,
            avatar,
            admin
        })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        return done(null, newUser)
    }catch(error:any){
        if(error.code === 11000){
            return done(null, false, {message: 'El usuario ya existe'})
        }
        logger.error(error)
        return done(null, false, {message: 'Error inesperado'})
    }
}
const login = async (req: Request, email: string, password: string, done:any) =>{
    try{
        const user = await userDao.findOne(email)
        if(!user){
            return done(null,false, { message: 'User not found'})
        }else{
            const match = await user.matchPassword(password)
            match ? done(null, user) : done(null, false)        
        }
    }catch(error){
            logger.error(error)
            return done(null,false, {message: 'Error inesperado'})
    }
}

type User = {
    _id?: string
    admin?: boolean
}

passport.serializeUser((user:User,done:any) =>{
    done(null, user._id)
})

passport.deserializeUser(async (user_id: string, done:any) =>{
    try{
        const user = await userDao.findUserById(user_id)
        return done(null, user)
    }catch(error){
        logger.error(error)
        return done(null, false)
    }
})

export const loginFunc = new LocalStrategy(strategyOptions, login)
export const signUpFunc = new LocalStrategy(strategyOptions, signup)