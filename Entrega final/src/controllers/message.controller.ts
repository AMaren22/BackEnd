import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logs.config";
import { messageService } from "../services/message.service";


export const getAllMessages = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const messageJson = await messageService.getallMessage()
        res.render("home", {messageJson})
    }catch(error){
        logger.error(error)
        next(error)
    }
}

export const getMessageByEmail = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const email = req.params.email
        const messageJson = await messageService.getMessageByEmail(email)        
        res.render("home", {messageJson})
    }catch(error){
        logger.error(error)
        next(error)
    }
}