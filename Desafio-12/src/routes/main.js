import { Router } from "express";
import { validateLogIn } from "../middlewares/middlewares.js";
import normalizeRoute from "./normalizer-route.js";
import productsRouter from "./products-test.js";
import { getHome, login, logout, singUp } from "../controllers/user.js";
import passport from "passport";
import { infoProcess } from "../controllers/infoProcess.js";
import { randoms } from "../controllers/randomsProcess.js";

const mainRouter = Router();

const passportOptions = {
  badRequestMessage: "Por favor ingrese el email y el password",
};

mainRouter.post("/signup", singUp);
mainRouter.post("/login",passport.authenticate("login", passportOptions),login);
mainRouter.get("/logout", logout);
mainRouter.get("/home", validateLogIn, getHome);

mainRouter.use("/productos-test", productsRouter);
mainRouter.use("/messages", normalizeRoute);

mainRouter.use("/info", infoProcess);
mainRouter.use("/randoms", randoms);

export default mainRouter;
