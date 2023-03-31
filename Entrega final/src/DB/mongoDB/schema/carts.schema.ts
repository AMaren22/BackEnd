import mongoose from "mongoose";
import { productsCollectionName } from "./products.schema";

export const cartCollectionNmae: string = 'carts';

const cartsSchema = new mongoose.Schema({
    timestamp: { type: String, default: new Date().toLocaleString() },
    productsID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: productsCollectionName,
            default: []
        },
    ],
});

export const CartModel = mongoose.model(
    cartCollectionNmae,
    cartsSchema
)
