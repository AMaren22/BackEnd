import mongoose from "mongoose";
import { productsCollectionName } from "./products-model";

export const cartCollectionName: string = "carts";

const cartsSchema = new mongoose.Schema({
  timestamp: { type: String, default: new Date().toLocaleString() },
  productsID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: productsCollectionName,
      default: [],
    },
  ],
});

export const CartsModel = mongoose.model(cartCollectionName, cartsSchema);
