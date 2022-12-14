import { Router } from "express";
import normalizeRoute from "./normalizer-route.js";
import productsRouter from "./products-test.js";
import {validateLogIn} from '../middlewares/middlewares.js'
import {loginGet, loginPost, logout, visit } from "../controllers/user.js";

const mainRouter = Router()

mainRouter.get('/', loginGet)
mainRouter.post('/login', loginPost)
mainRouter.get('/logout', logout)
mainRouter.get('/secret-endpoint', validateLogIn, visit)

mainRouter.use('/productos-test', productsRouter)
mainRouter.use('/messages', normalizeRoute)

export default mainRouter