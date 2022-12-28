export const sessionExist = (req, res) => {
    const session = req.session.passport?.user;
    if (session) {
      return true;
    } else {
      return false;
    }
  };
  