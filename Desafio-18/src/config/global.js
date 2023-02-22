import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
    PORT: process.env.PORT || 8080,
    URI: process.env.MONGO_ATLAS_URI || 'mongodb://127.0.0.1:27017/entrega18-TEST',
} 

