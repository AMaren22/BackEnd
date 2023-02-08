import mongoose from "mongoose";
import { config } from "../../config/global.js";
import { messageModel } from "./schema/message.schema.js";
import { normModel } from "./schema/normalize.schema.js";
import { UserModel } from "./schema/user.schema.js";
import { ProductsModel } from "./schema/products.schema.js";

const connectionString = config.URI

export const initMongoDb = async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(connectionString);
    console.log("Ready");
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async () =>{
  try{
    const data = await messageModel.find()
    return data
  }catch(error){
    console.log(error);
  }
}

export const getNormalizeMessages = async () =>{
  try{
    const data = await normModel.find()
    return data
  }catch(error){
    console.log(error);
  }
}

export const newUser = async (email, password) =>{
  try{
    const newUser = new UserModel({email, password})
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    return newUser
  }catch(error){
    console.log(error);
  }
}

export const getUser = async (email) =>{
  try{
    const data = await UserModel.findOne({email:email})
    return data
  }catch(error){
    console.log(error);
  }
}

export const getUserByID = async (id) =>{
  try{
    const data = await UserModel.findById(id)
    return data
  }catch(error){
    console.log(error);
  }
}

export const getProductsDB = async () =>{
  try{
    const data = await ProductsModel.find()
    return data
  }catch(error){
    console.log(error);
  }
}
export const getLastProduct = async () =>{
  try{
    const data = await ProductsModel.find().limit(1).sort({$natural:-1})
    return data
  }catch(error){
    console.log(error);
  }
}

export const createProduct = async (data) =>{
  try{
    await ProductsModel.create(data)
  }catch(error){
    console.log(error);
  }
}