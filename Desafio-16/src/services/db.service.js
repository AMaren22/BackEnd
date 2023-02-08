import { getProductsDB, initMongoDb } from "../db/mongoDB/mongodb.js"
import { sqLiteDb } from '../db/SqLite/sqlite.js'


export const initDB = async () =>{
    try{
        await initMongoDb()
        console.log('Base de datos inicializada');
    }catch(error){
        console.log(error);
    }
}

export const getProducts = async () =>{
    try{
        const data = await getProductsDB()
        return data
    }catch(error){
        console.log(error);
    }
}

export const getMessagesSqlite = async () =>{
    try{
        const data = await sqLiteDb.getAll()
        return data
    }catch(error){
        console.log(error);
    }
}