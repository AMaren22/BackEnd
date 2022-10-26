const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const createError = require('http-errors')
const productRoute = Router()

const filePath = path.resolve(__dirname,'../productos.json')


const readFile = async () => {
    try {
      const fileData = await fs.promises.readFile(filePath, "utf-8");
      const dataJson = JSON.parse(fileData);
      return dataJson;
    } catch (err) {
      console.log(err);
    }
  };
  const saveFile = async (params) => {
    try {
      const data = JSON.stringify(params, null, "\t");
      await fs.promises.writeFile(filePath, data);
    } catch (err) {
      console.log(err);
    }
  };
  const validateBody = (data) => {
    if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw createError(400,'Datos invalidos');
  }
  
  productRoute.get("/", async (req, res, next) => {
    try {
      const dataJson = await readFile();
      res.render('tablas.pug', {dataJson})
    } catch (err) {
      next(err);
    }
  });
  
  productRoute.get("/:id", async (req, res,next) => {
    try {
      const id = req.params.id;
  
      const dataJson = await readFile();
  
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
  productRoute.post("/", async (req, res,next) => {
    try {
      const {body} = req

      body.price = Number(body.price)
      
      validateBody(body)
  
      const dataJson = await readFile();
  
      const newProduct = {
        id: uuidv4(),
        title: body.title,
        price: body.price,
        thumbnail: body.thumbnail
      };
  
      dataJson.push(newProduct);
  
      await saveFile(dataJson);
  
      res.redirect('/')

    } catch (err) {
      next(err);
    }
  });
  productRoute.put("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const dataJson = await readFile();
  
      const index = dataJson.findIndex((itemId) => itemId.id == id);
  
      if (index < 0) {
        return res.status(404).json({
          msg: `El producto con id ${id} no existe`,
        });
      }
  
      const {body} = req

      body.price = Number(body.price)
  
      validateBody(body)
  
      dataJson[index] = {
        id: id,
        title: body.title,
        price: body.price,
        thumbnail: body.thumbnail,
      };
  
      await saveFile(dataJson);
  
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
  
      const dataJson = await readFile();
  
      const index = dataJson.findIndex((itemId) => itemId.id == id);
  
      if (index < 0) {
        return res.status(404).json({
          msg: `El producto con id ${id} no existe`,
        });
      }
  
      dataJson.splice(index, 1);
  
      await saveFile(dataJson);
  
      res.json({
        msg: "El producto se ha eliminado correctamente",
      });
    } catch (err) {
      next(err);
    }
  });


module.exports = productRoute