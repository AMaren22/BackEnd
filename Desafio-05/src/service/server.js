const express = require('express')
const path = require('path')
const mainRouter = require('../routes/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const publicPath = path.resolve(__dirname, '../../public')
const viewsPath = path.resolve(__dirname, '../../views')

app.use(express.static(publicPath))

app.use('/api', mainRouter)

app.set('view engine', 'pug')
app.set('views', viewsPath )

app.get('/', (req, res) =>{
    res.render('formulario')
})



app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});



module.exports = app