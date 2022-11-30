import mongoose from "mongoose";

export const productsCollectionName: string = "products";

export const productsSchema = new mongoose.Schema({
  timestamp: { type: String, default: new Date().toLocaleString() },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductsModel = mongoose.model(
  productsCollectionName,
  productsSchema
);
