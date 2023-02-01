import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import { config } from "../config/config";
import { logger } from "../config/logs.config";

dotenv.config()

const connectionString:string = config.URI || 'mongodb://localhost:27017'

export const initMongoDB = async() =>{
    try{
        logger.info('Connecting...');
        await mongoose.connect(connectionString,{dbName: config.DB})
        logger.info('Ready');    
    }catch(error){
        logger.error(error);        
    }
}

