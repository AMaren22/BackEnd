
export interface ProductsType{
    id:string|undefined,
    timestamp: string|undefined,
    nombre: string|undefined,
    descripcion:string|undefined,
    codigo: number|undefined,
    foto: string|undefined,
    precio: number|undefined,
    stock:number|undefined
}

export interface CartType{
    id:string,
    timestap:string,
    productos:[ProductsType]
}