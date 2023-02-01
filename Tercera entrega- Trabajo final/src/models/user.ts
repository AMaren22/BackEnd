import {model,Model, Schema} from 'mongoose'
import bcrypt from 'bcryptjs'


interface UserInterface{
    email: string,
    password: string  ,
    name: string ,
    adress: string ,
    age: number ,
    phone: string ,
    avatar: string ,
    admin: boolean
}

interface UserMethodsInterface  {
    encryptPassword(arg0:string): Promise<string>;
    matchPassword(arg0:string): Promise<boolean>;
}

type UserModel = Model<UserInterface, {}, UserMethodsInterface>

const UserSchema = new Schema({
    email: { type: String, required: true , unique: true },
    password: { type: String , required: true} ,
    name: { type: String, required:true },
    adress: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required:true },
    avatar: { type: String },
    admin: { type: Boolean, default: false}
});

UserSchema.methods.encryptPassword = async (password: string) =>{
    try{
        const salt:string = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }catch (error){
        console.log(error);
    }
};

UserSchema.methods.matchPassword = async function (password:string) {
    try{
        return await bcrypt.compare(password, this.password)
    } catch(error){
        console.log(error);
    }
}

export const UserModel = model<UserInterface, UserModel>('users', UserSchema)