import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString:string = process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017'

const initMongoDB = async() =>{
    try{
        console.log('Connecting...');
        await mongoose.connect(connectionString,{dbName:process.env.MONGO_ATLAS_DB_NAME})
        console.log('Ready');    
    }catch(error){
        console.log(error);
        
    }
}

initMongoDB()