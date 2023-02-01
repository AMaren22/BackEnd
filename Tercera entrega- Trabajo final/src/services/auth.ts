import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from "../models/user";
import { StrategyOptions, UsersBody } from "../utils/globals";
import { Request,Response } from "express";
import { logger } from "../config/logs.config";



const strategyOptions: StrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const signup = async (req:Request,email:string, password:string, done:any) =>{
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

const login = async (req:Request, email:string, password:string, done:any) =>{
    try{
        const user = await UserModel.findOne({email: email})        
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

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup)

type User = {
    _id?: string
}

passport.serializeUser((user:User,done) =>{
    done(null, user._id)
})

passport.deserializeUser(async (userId:string,done) =>{
    try{
        const user = await UserModel.findById(userId)
        return done(null, user)
    }catch{
        return done(null, false)
    }
}) 