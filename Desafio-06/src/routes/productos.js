const { Router } = require("express");
const {saveFile,readFile,validateBody} = require('../controllers/files')
const { v4: uuidv4 } = require("uuid");


const productRoute = Router();

productRoute.get("/", async (req, res, next) => {
  try {
    const dataJson = await readFile('productos');
    res.render("tablas.pug", { dataJson });
  } catch (err) {
    next(err);
  }
});

productRoute.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const dataJson = await readFile('productos');

    const index = dataJson.findIndex((itemId) => itemId.id == id);

    if (index < 0) {
      return res.status(404).json({
        msg: `El producto con id ${id} no existe`,
      });
    }

    res.json({
      data: dataJson[index],
    });
  } catch (err) {
    next(err);
  }
});
productRoute.post("/", async (req, res, next) => {
  try {
    const { body } = req;

    body.price = Number(body.price);

    validateBody(body);

    const dataJson = await readFile('productos');

    const newProduct = {
      id: uuidv4(),
      title: body.title,
      price: body.price,
      thumbnail: body.thumbnail,
    };

    dataJson.push(newProduct);

    await saveFile(dataJson,'productos');

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});
productRoute.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const dataJson = await readFile('productos');

    const index = dataJson.findIndex((itemId) => itemId.id == id);

    if (index < 0) {
      return res.status(404).json({
        msg: `El producto con id ${id} no existe`,
      });
    }

    const { body } = req;

    body.price = Number(body.price);

    validateBody(body);

    dataJson[index] = {
      id: id,
      title: body.title,
      price: body.price,
      thumbnail: body.thumbnail,
    };

    await saveFile(dataJson,'productos');

    res.json({
      msg: "El producto se ha modificado correctamente",
    });
  } catch (err) {
    next(err);
  }
});
productRoute.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const dataJson = await readFile('productos');

    const index = dataJson.findIndex((itemId) => itemId.id == id);

    if (index < 0) {
      return res.status(404).json({
        msg: `El producto con id ${id} no existe`,
      });
    }

    dataJson.splice(index, 1);

    await saveFile(dataJson,'productos');

    res.json({
      msg: "El producto se ha eliminado correctamente",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = productRoute;
