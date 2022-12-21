import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { sqLiteDb } from "../classes/sqLiteDb.js";
import { mySqlDb } from "../classes/mySqlDb.js";
import mainRouter from "../routes/main.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { validateLogIn } from "../middlewares/middlewares.js";
import { config } from "../config/global.js";
import { loginFunc, signUpFunc } from "./auth.js";
import passport from "passport";
import { sessionExist } from "../utils/session.js";
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

app.get("/", (req, res) => {
  if (sessionExist(req, res)) res.redirect("/formulario");
  res.render("home");
});
app.get("/signup", (req, res) => {
  if (sessionExist(req, res)) res.redirect("/formulario");
  res.render("signup");
});
app.get("/login", (req, res) => {
  if (sessionExist(req, res)) res.redirect("/formulario");
  res.render("login");
});
app.get("/formulario", validateLogIn, async (req, res, next) => {
  try {
    //  Estas dos funciones se utilizan solo la primera vez, para crear las tablas
    //  await sqLiteDb.createTables()
    //  await mySqlDb.createTables()
    const name = req.user.email;
    const dataJson = await mySqlDb.getAll();
    const messageJson = await sqLiteDb.getAll();
    res.render("formulario", { dataJson, messageJson, name });
  } catch (error) {
    next(error);
  }
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    message,
  });
});

export default server;
