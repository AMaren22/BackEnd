import mongoose from "mongoose";
import { productsCollectionName } from "./products.schema";

export const orderCollectionName: string = 'orders'

export const orderSchema = new mongoose.Schema({
    timestamp: { type: String, default: new Date().toLocaleString() },
    products: [
        {
            type: Object ,
            default: []
        },
    ],
    email: { type: String, required: true},
    estado: { type: String, default: 'Generada'}
})

export const OrderModel = mongoose.model(
    orderCollectionName,
    orderSchema
)