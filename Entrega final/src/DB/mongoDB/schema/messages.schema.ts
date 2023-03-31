import mongoose from "mongoose";

export const messageCollectionName: string = 'messages'

export const messagesSchema = new mongoose.Schema({
    timestamp: { type: String, required: true},
    message: {type: String, required: true},
    email: {type: String, required: true},
    type: {type: String, required:true}
})

export const MessagesModel = mongoose.model(
    messageCollectionName,
    messagesSchema
)