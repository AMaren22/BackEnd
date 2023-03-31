import { ObjectId } from "mongoose";

export interface UserInterface{
    email: string,
    password: string,
    name: string,
    adress: string,
    age: number,
    phone: string,
    avatar: string,
    admin: boolean
}
export interface ProductsType{
    name: string,
    description:string,
    code: number,
    photo: string,
    price: number,
    stock:number,

}

export interface CartType{
    timestap:string,
    productos:[ProductsType]|[]
}

export interface Error {
    status?: number,
    message?: string
}

export interface StrategyOptions {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback: true;
}

export interface UsersBody{
    email: string,
    password: string ,
    name: string,
    adress: string,
    age: number,
    phone: number,
    avatar: string,
    admin: boolean
}
export interface Config {
    PORT?: string | number | undefined,
    URI?: string,
    DB?: string,
    SECRET?: string,
    CRYPTO_SECRET?: string,
    HOST?: string,
    PORT_ETHEREAL?: string | number,
    EMAIL?: string,
    PASSWORD?: string
    SID: string | undefined,
    TOKEN: string | undefined,
    PHONE: string | undefined,
    PHONE_WPP: string | undefined,
}

export interface CurrentUser {
    phone?: string,
    name?: string,
    email?: string
    admin?: boolean
}
export interface MessagesType{
    email: string,
    type: string,
    message: string
}

export interface OrderType{
    email: string,
    products: [ProductsType]|[]
}

export interface DtoClass{
    _id: ObjectId,
    name: string,
    code: number,
    description: string,
    price: number
}
