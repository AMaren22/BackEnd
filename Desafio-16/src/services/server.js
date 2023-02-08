import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import mainRouter from "../routes/main.route.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "../config/global.js";
import { loginFunc, signUpFunc } from "./auth.service.js";
import passport from "passport";
import { sessionMid, validateLogIn } from "../middlewares/middlewares.js";
import { homeRender, loginRender, signUpRender } from "../controllers/render.controller.js";
import { formController } from "../controllers/formulario.controller.js";

const app = express();
const server = http.Server(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "../../public");
const viewsPath = path.resolve(__dirname, "../../views");

const ttlSeconds = 180;

const StoreOptions = {
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
  store: MongoStore.create({
    mongoUrl: config.URI,
    dbName: config.DB,
    crypto: {
      secret: config.CRYPTO_SECRET,
    },
  }),
};
passport.use("login", loginFunc);
passport.use("signup", signUpFunc);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicPath));
app.set("view engine", "pug");
app.set("views", viewsPath);

app.use("/api", mainRouter);

app.get("/", sessionMid, homeRender);
app.get("/signup", sessionMid, signUpRender);
app.get("/login", sessionMid, loginRender); 
app.get("/formulario", validateLogIn, formController ); 

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    message,
  });
});

export default server;
