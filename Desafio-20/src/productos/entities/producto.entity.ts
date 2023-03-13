/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Producto & Document

@Schema()
export class Producto {
    @Prop({type: String, required: true})
    name: string

    @Prop({type: Number, required: true})
    price: number

    @Prop({type: String, required: true})
    code: string

    @Prop({type: Number, required:true})
    stock: number
}

export const ProductCollectionName = Producto.name
export const ProductsSchema = SchemaFactory.createForClass(Producto)
