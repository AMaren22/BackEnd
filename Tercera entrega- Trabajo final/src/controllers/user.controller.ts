import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { sendMailEthereal } from "../services/email.service";
import { logger } from "../config/logs.config";
import { CurrentUser } from "../utils/globals";


 const badRequestMessage= 'Por favor ingrese el email y el password'
 //No FUNCIONA


export const signUp =  (req:Request, res:Response, next:NextFunction) =>{    
    passport.authenticate('signup',{failureMessage: badRequestMessage}, async (error, user, info) =>{
        if(error){
            return next(error)
        }
        if(!user){
            res.status(401).json(info)
        }
         try{
            await sendMailEthereal('Nuevo registro',
            `El usuario ${req.body.name}\n. Se ha registrado con el mail ${req.body.email}\n. Vive en : ${req.body.adress}\n. Tiene ${req.body.age} años\n. Su número de telefono es : ${req.body.phone}`)
            return res.status(200).json({
                msg: 'Mail enviado con éxito'
            })
        }catch(error){
            logger.error(error)
        }
        

    })(req,res,next)
};

type User = {
    name?: string,
    phone?: string,
    email?: string
}

export let currentUser:CurrentUser = {}


export const login = (req:Request ,res:Response ,next:NextFunction) =>{    
    passport.authenticate('login',{failureMessage: badRequestMessage}, (error, user, info) =>{
        if(error){            
            return next(error)
        }
        if(!user){
            return res.status(401).json(info)
        }
        if(req.user){
            const username:User = req.user
            currentUser.name = username.name
            currentUser.phone = username.phone
            currentUser.email = username.email
            res.json({
                msg: `Bienvenido, ${username.name}`
            })

        }
    } )(req,res,next)
}

export const logout = (req: any, res: Response, next: NextFunction) =>{
    const session = req.session.passport.user
    const name = req.user.name
    if(session){
        req.session.destroy((err:any) =>{
            if(!err){
                currentUser = {}
                res.json({
                    msg: `Hasta luego ${name}`
                })
            }else{
                return next (err)
            }
        })
    }
}