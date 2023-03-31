import { NextFunction, Request, Response } from "express";

export const sessionExistUtils = (req: Request, res: Response) =>{
    const session = req.session.passport?.user
    if(session){
        return true
    }else{
        return false
    }
  
}