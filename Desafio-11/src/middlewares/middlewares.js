export const validateLogIn = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: "Unauthorized" });
  next();
};
