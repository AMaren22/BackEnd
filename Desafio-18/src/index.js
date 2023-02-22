import express from 'express'
import{ config } from './config/global.js'
import productRouter from './routes/products.route.js'

const app = express()

app.use(express.json())
app.use('/api', productRouter)

app.listen(config.PORT, () =>{
    console.log(` Server Up ${config.PORT}`);
})

export default app