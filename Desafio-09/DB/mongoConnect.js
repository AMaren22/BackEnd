import mongoose from "mongoose"

const connectionString = 'mongodb://localhost:27017/entrega09'

export const initMongoDb = async () =>{
    try{
        console.log('Connecting...');
        await mongoose.connect(connectionString)
        console.log('Ready');
    }catch(error){
        console.log(error);
    }
}
