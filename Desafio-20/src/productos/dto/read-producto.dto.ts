/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { Types } from 'mongoose';


export class ReadProductoDTO{
    constructor({_id,name, price, stock}){
        this._id = _id
        this.name = name
        this.price = price
        this.stock = stock
    }
    @IsNotEmpty()
    @IsString()
    _id: Types.ObjectId; 

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    name:string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price:number

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock:number
}
// CONSULTAR SOBRE EL "TYPE" DE DATA
export const asDto = (data) =>{
    if(Array.isArray(data)){
        return data.map(product => new ReadProductoDTO(product))
    }else{
        return new ReadProductoDTO(data)
    }
}