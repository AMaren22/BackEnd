const users = [
  {
    name: "Augusto",
    admin: true,
  },
  {
    name: "Messi",
    admin: false,
  },
];

export const loginPost = (req, res) => {
  const { name } = req.body;
  const index = users.findIndex((user) => user.name === name);
  if (index < 0) {
    res.status(401).json({ msg: "Usuario NO autorizado" });
  } else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      counter: 1,
      username: user.name,
      admin: user.admin,
    };
    res.redirect("/formulario");
  }
};

export const loginGet = (req, res) => {
  const name = req.session.info?.username;
  if (name) {
    return res.redirect("/formulario");
  } else {
    res.render("login");
  }
};

export const visit = (req, res) => {
  req.session.info.counter++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.counter} veces`,
  });
};

export const logout = (req, res) => {
  const name = req.session.info?.username;
  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render("logout", { name });
      } else {
        res.redirect("/formulario");
      }
    });
  }
};

export const infoSession = (req, res) => {
  res.render("components/loginAlert", { name: req.session.info.username });
};
