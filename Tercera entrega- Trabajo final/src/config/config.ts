import * as dotenv from 'dotenv'
import { Config } from '../utils/globals'
dotenv.config()

    export const config:Config = {
        PORT: process.env.PORT || 8080,
        URI: process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017',
        DB: process.env.MONGO_ATLAS_DB_NAME,
        SECRET: process.env.SECRET_STRING,
        CRYPTO_SECRET: process.env.CRYPTO_SECRET,
        HOST: process.env.HOST,
        PORT_ETHEREAL: process.env.ETHEREAL_PORT,
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD,
        SID: process.env.SID,
        TOKEN: process.env.TOKEN,
        PHONE: process.env.PHONE,
        PHONE_ADMIN: process.env.PHONE_ADMIN ,
        PHONE_WPP: process.env.PHONE_WPP
    }

