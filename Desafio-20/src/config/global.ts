/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv'
dotenv.config()

interface Config {
    PORT: string,
    URI: string
}

export const config:Config = {
    PORT: process.env.PORT,
    URI: process.env.MONGO_URI
}