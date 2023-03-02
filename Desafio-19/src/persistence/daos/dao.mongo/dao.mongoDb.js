import mongoose from "mongoose";
import { config } from "../../../config/global.js";

const connectionString = config.URI
mongoose.set('strictQuery', false)

export default class DaoMongoDb {
    static instance
    constructor(collection, schema){
      this.collection = mongoose.model(collection,schema)
      if(!DaoMongoDb.instance){
        this.initDB = mongoose.connect(connectionString, () =>{
          console.log("MongoDB Ready");
        })
        DaoMongoDb.instance = this
      }else {
        return DaoMongoDb.instance
      }
    }
  
    async initMongoDb() {
      try{
        return this.initDB
      }catch(error){
        console.log(error);
      }
    } 
    
    async save(data){
        try{
            const document = await this.collection.create(data)
            return document
        }catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            const data = await this.collection.find()
            return data
        }catch(error){
            console.log(error);
        }
    }
  }