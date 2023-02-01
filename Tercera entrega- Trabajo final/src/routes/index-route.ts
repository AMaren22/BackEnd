import { Router } from "express";
import productsRouter from "./product-route";
import cartRouter from "./cart-route";
import passport from "passport";
import { login, logout, signUp } from "../controllers/user.controller";
import multer from "multer";
import { logger } from "../config/logs.config";

const upload = multer({ dest: './uploads' });
const mainRouter:Router = Router()


const badRequestMessage= "Por favor ingrese el email y el password"


mainRouter.use('/productos', productsRouter)
mainRouter.use('/carrito', cartRouter)
// HACER EL CONTROLLER DEL USER
mainRouter.post('/login', passport.authenticate('login', {failureMessage: badRequestMessage}), login)
mainRouter.get('/logout', logout)
mainRouter.post('/signup', signUp)

mainRouter.post('/profile', upload.single('imagen'), (req, res) => {
    try {
      logger.info(req.file);
      res.send(req.file);
    } catch (err) {
        logger.error(err)
      res.send(400);
    }
  });

export default mainRouter