const { Router } = require("express");
const productRoute = require("./productos");


const mainRoute = Router()

mainRoute.use('/productos', productRoute)


module.exports = mainRoute