import mongoose from "mongoose"

export const productsCollectionName: string = 'products'

export const productsSchema = new mongoose.Schema({
    timestamp: { type: String, default: new Date().toLocaleString() },
    name: { type: String, required: true },
    description: { type: String, required: true},
    code: { type: Number, required: true},
    photo: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},
});

export const ProductsModel = mongoose.model(
    productsCollectionName,
    productsSchema
)