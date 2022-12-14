export const validateLogIn = (req, res, next) => {
  if (req.session.info?.username) next();
  else
    res.status(401).json({
      msg: "Usuario NO autorizado",
    });
};
