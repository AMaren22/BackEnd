
export interface ProductsType{
    nombre: string,
    descripcion:string,
    codigo: number,
    foto: string,
    precio: number,
    stock:number
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
    PHONE_ADMIN: string | undefined,
    PHONE_WPP: string | undefined
}

export interface CurrentUser {
    phone?: string,
    name?: string,
    email?: string
}
