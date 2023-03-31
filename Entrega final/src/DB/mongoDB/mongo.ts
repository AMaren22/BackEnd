import mongoose from "mongoose";
import { config } from "../../config/config";
import { logger } from "../../config/logs.config";

const connectionString: string  = config.URI || 'mongodb://localhost:27017'

export const initMongoDb = async() =>{
    try{
        logger.info('Connecting...')
        await mongoose.connect(connectionString, { dbName: config.DB})
        logger.info('DB Ready')
    }catch(error){
        logger.error(error)
    }
}