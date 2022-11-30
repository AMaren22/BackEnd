
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
