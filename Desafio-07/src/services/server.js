import express from "express"
import http from 'http'
import path from "path"
import { fileURLToPath } from "url"
import { sqLiteDb } from "../classes/sqLiteDb.js"
import { mySqlDb } from "../classes/mySqlDb.js"

const app = express()
const server = http.Server(app)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicPath = path.resolve(__dirname, '../../public')
const viewsPath = path.resolve(__dirname, '../../views')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(publicPath))
app.set('view engine', 'pug')
app.set('views', viewsPath )

app.get('/',async (req, res, next) =>{
    try{
        //  Estas dos funciones se utilizan solo la primera vez, para crear las tablas
        //  await sqLiteDb.createTables() 
        //  await mySqlDb.createTables()
        const dataJson = await mySqlDb.getAll()
        const messageJson = await sqLiteDb.getAll()
        res.render('formulario', {dataJson,messageJson})
    }catch(error){
        next(error)
    }
})
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error'

    res.status(status).json({
        message,
    })
});

export default server
