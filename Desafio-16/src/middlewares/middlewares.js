import { sessionExist } from "../utils/session.util.js";

export const validateLogIn = (req, res, next) => {
    if (!req.isAuthenticated())
      return res.status(401).json({ msg: "Unauthorized" });
    next();
};

export const sessionMid = (req, res, next) =>{
  if (sessionExist(req, res)) res.redirect("/formulario");
  next()
}
  