import mongoose from "mongoose"

export const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    code: { type: String, required: true},
    stock: { type: Number, required: true},
})

export const ProductsModel = mongoose.model('products', productsSchema)