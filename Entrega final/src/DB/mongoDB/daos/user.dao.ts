import { logger } from "../../../config/logs.config";
import { UserModel } from "../schema/user.schema";


class UserDAO{
    constructor(){}

    async findOne(email: string){
        try{
            return await UserModel.findOne({email: email})
        }catch(error){
            logger.error(error)
        }
    }
    async findUserById(id:string){
        try{
            return await UserModel.findById(id)
        }catch(error){
            logger.error(error)
        }
    }
}

export const userDao = new UserDAO()