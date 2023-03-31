import { Request, Response, NextFunction } from "express";
import { currentUser } from "../controllers/user.controller";
import { sessionExistUtils } from "../utils/session.utils";


export const auth = (req: Request, res: Response, next: NextFunction) =>{
    if(!currentUser.admin){
        return res.status(401).json({
            msg: 'Unauthorized'
        })
    }
    next()
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.isAuthenticated()){
        return res.status(401).json({
            msg: 'Please log in'
        })
    }
    next()
}

export const sessionExist = (req: Request, res:Response, next:NextFunction) =>{
    if(sessionExistUtils(req, res)){
        return res.json({
            msg: 'You are already logged in'
        })
    } 
        
    next()
}


