import mongoose from "mongoose";
import { authorSchema } from "./modelAuthor.js";

export const messageCollectionName = "messages";

export const messageSchema = new mongoose.Schema({
  author: { type: authorSchema, required: true },
  text: { type: String, required: true },
});

export const messageModel = mongoose.model(
  messageCollectionName,
  messageSchema
);
