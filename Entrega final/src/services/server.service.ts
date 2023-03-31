import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction} from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import http from 'http'
import cors from 'cors'
import { config } from "../config/config";
import mainRouter from "../routes/main.route";
import { Error } from "../utils/globals.interfaces";
import { loginFunc, signUpFunc } from "./auth.service";
import { info } from '../docs/info'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express'

const app = express()
const server = http.createServer(app)

const specs = swaggerJSDoc(info)

const viewsPath = path.resolve(__dirname, '../../views')
const publicPath = path.resolve(__dirname,'../../public')

interface SessionInfo {
    loggedIn: boolean;
    username : string;
    admin : boolean;
}

declare module 'express-session' {
    interface SessionData {
        info: SessionInfo,
        passport: {[key: string]: any}
    }
}

const ttl_seconds = 180

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.URI,
        dbName: config.DB,
        crypto: {
            secret: config.CRYPTO_SECRET || false
        },
    }),
    secret: config.SECRET || [],
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttl_seconds * 1000
    }
}))

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
passport.use("login", loginFunc)
passport.use("signup", signUpFunc)
app.use('/api', mainRouter)
app.set("view engine", "pug")
app.set("views", viewsPath)
app.use(express.static(publicPath))


app.use((req:Request, res:Response, next:NextFunction) => {
    res.status(404).json({
        msg:'Page not found on the server'
    })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) =>{
    const status = error.status || 500
    const message = error.message || 'Internal Server Error'
    res.status(status).json({
        message
    })
})


export default server