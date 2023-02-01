import express,{Request,Response, NextFunction} from 'express';
import { Error } from '../utils/globals';
import mainRouter from '../routes/index-route';
import passport from "passport";
import MongoStore from "connect-mongo";
import { config } from '../config/config';
import session from 'express-session';
import cookieParser from "cookie-parser";
import {loginFunc,signUpFunc } from './auth'

const app = express()

interface SessionInfo {
    loggedIn: boolean;
    username : string;
    admin : boolean;
}

declare module 'express-session' {
    interface SessionData {
        info: SessionInfo;
    }
}

const ttlSeconds = 180;



// SE FUERON LOS ERRORES, PERO NO ES LA FORMA => || [] y || false

 app.use(session({
    store: MongoStore.create({
        mongoUrl: config.URI,
        dbName: config.DB,
        crypto: {
            secret: config.CRYPTO_SECRET || false,
        },
    }),
    secret: config.SECRET || [],
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: ttlSeconds * 1000
    },
})); 


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.use("login", loginFunc);
passport.use("signup", signUpFunc);


app.use('/api', mainRouter)

app.use((req, res, next) => {
    res.status(404).json({
        msg:'Page not found on the server'
    })
})

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        message,
    })
});


export default app
