import { logger } from "../config/logs.config";
import { messageDao } from "../DB/mongoDB/daos/message.dao";

class MessageService{
    constructor() {}

    async getallMessage(){
        try{
            return await messageDao.getAllMessages()
        }catch(error){
            logger.error(error)
        }
    }
    async getMessageByEmail(email: string){
        try{            
            return await messageDao.getEmailMessage(email)
        }catch(error){
            logger.error(error)
        }
    }
}

export const messageService = new MessageService()