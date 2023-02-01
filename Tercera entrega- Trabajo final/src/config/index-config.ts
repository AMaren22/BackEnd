import { NextFunction,Request,Response } from "express";
import { config } from "./config";

export const PORT:string|number|undefined = config.PORT;

const admin:boolean = true

export const auth = (req:Request,res:Response,next:NextFunction): void =>{
    if (!admin){
        res.status(401).json({
            msg:'No Autorizado'
        })
    }
    next();
}

