const express = require('express')
const http = require('http')
const path = require('path')
const { readFile } = require('../controllers/files')
const mainRouter = require('../routes/index')

const app = express()
const server = http.Server(app)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const publicPath = path.resolve(__dirname, '../../public')
const viewsPath = path.resolve(__dirname, '../../views')

app.use(express.static(publicPath))

app.use('/api', mainRouter)

app.set('view engine', 'pug')
app.set('views', viewsPath )

app.get('/',async (req, res, next) =>{
    try{
    const dataJson = await readFile('productos')
    const messageJson = await readFile('messages')
    res.render('formulario', {dataJson,messageJson})
    }catch (err){
        next(err)
    }
})



app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});



module.exports = server