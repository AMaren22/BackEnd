import passport from "passport";

const passportOptions = {
  badRequestMessage: "Por favor ingrese el email y el password",
};

export const singUp = (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);
    res.render("userCreate");
  })(req, res, next);
};

export const login = (req, res) => {
  res.status(200).redirect("/formulario");
};

export const logout = (req, res) => {
  const session = req.session.passport.user;
  const name = req.user.email;
  if (session) {
    req.session.destroy((err) => {
      if (!err) {
        res.render("logout", { name });
      } else {
        res.redirect("/formulario");
      }
    });
  }
};

export const getHome = (req, res) => {
  res.json(req.session);
};
