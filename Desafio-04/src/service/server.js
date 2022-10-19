const express = require('express')
const mainRoute = require('../routes')
const path = require('path')

const app = express()

const publicPath = path.resolve(__dirname, '../../public')

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

app.use(express.static(publicPath))
app.use('/api', mainRoute)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});

module.exports = app