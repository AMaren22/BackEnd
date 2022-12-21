import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
    PORT: process.env.PORT || 8080,
    URI: process.env.MONGO_ATLAS_URI,
    DB: process.env.MONGO_ATLAS_DB_NAME,
    SECRET: process.env.SECRET_STRING,
    CRYPTO_SECRET: process.env.CRYPTO_SECRET
} 

