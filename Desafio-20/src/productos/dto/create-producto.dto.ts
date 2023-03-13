/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductoDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    name:string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price:number

    @IsNotEmpty()
    @IsString()
    @Length(0, 30)
    code:string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock:number
}
