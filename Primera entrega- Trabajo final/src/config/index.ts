import { NextFunction,Request,Response } from "express";

export const PUERTO:string|number = process.env.PORT || 8080;

const admin:boolean = true

export const auth = (req:Request,res:Response,next:NextFunction): void =>{
    if (!admin){
        res.status(401).json({
            msg:'No Autorizado'
        })
    }
    next();
}

