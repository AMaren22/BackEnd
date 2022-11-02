const { Router } = require("express");
const productRouter= require('./productos')


const mainRouter = Router()

mainRouter.use('/productos', productRouter)




module.exports = mainRouter