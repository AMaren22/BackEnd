import { NextFunction, Request, Response } from "express"
import passport from "passport"
import { logger } from "../config/logs.config"
import { sendMailEthereal } from "../services/email.service"
import { CurrentUser } from "../utils/globals.interfaces"

const badRequestMessage = 'Por favor ingrese email y el password'

export const signUp = (req: Request, res: Response, next: NextFunction) =>{
    passport.authenticate('signup',{failureMessage: badRequestMessage}, async (error, user, info) =>{
        if(error){
            logger.error(error)
            return next(error)
        }
        if(!user){
            res.status(401).json(info)
        }
        try{
            await sendMailEthereal('Nuevo registro de usuario', 
            `El usuario ${req.body.name}\n. Se ha registrado con el mail ${req.body.email}\n. Vive en : ${req.body.adress}\n. Tiene ${req.body.age} años\n. Su número de telefono es : ${req.body.phone}`)
            return res.status(200).json({
                msg: 'Se registró correctamente el nuevo usuario',
                status: 'Mail enviado con éxito'
            })
        }catch(error){
            logger.error(error)
        }
    })(req,res,next)
}

type User = {
    name?: string,
    phone?: string,
    email?: string,
    admin?: boolean
}

export let currentUser: CurrentUser = {}

export const login = (req:Request ,res:Response ,next:NextFunction) =>{
    passport.authenticate('login', {failureMessage: badRequestMessage}, (error, user, info) =>{
        if(error){
            logger.error(error)
            return next(error)
        }
        if(!user){
            res.status(401).json(info)
        }
        if(req.user){
            const username: User = req.user
            currentUser.name = username.name,
            currentUser.phone = username.phone,
            currentUser.email = username.email
            currentUser.admin = username.admin
            res.json({
                msg: `Bienvenido ${username.name}`
            })
        }
    })(req, res, next)
}

export const logout = (req: any, res: Response, next: NextFunction) =>{
    const session = req.session.passport.user
    const name = req.user.name
    if(session){
        req.session.destroy((error:any) =>{
            if(!error){
                currentUser = {}
                res.json({
                    msg: `Hasta luego ${name}`
                })
            }else{
                logger.error(error)
                return next(error)
            }
        })
    }
}

export const uploadThumbnail = async (req: Request, res: Response) =>{
    try{
        res.send(req.file)
    }catch(error){
        logger.error(error)
        res.send(400)
    }
}