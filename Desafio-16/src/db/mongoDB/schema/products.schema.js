import mongoose from "mongoose"


export const productsCollectionName = 'products'

export const productsSchema = new mongoose.Schema({
    title: { type: String, required: true},
    price: { type: Number, required: true},
    thumbnail: { type: String}
})

export const ProductsModel = mongoose.model(
    productsCollectionName,
    productsSchema
)