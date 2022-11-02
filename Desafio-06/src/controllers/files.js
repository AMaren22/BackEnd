const fs = require("fs");
const path = require("path");
const createError = require('http-errors')


const readFile = async (pathFile) => {
  try {
      const filePath = path.resolve(__dirname,`../../${pathFile}.json`)
      const fileData = await fs.promises.readFile(filePath, "utf-8");
      const dataJson = JSON.parse(fileData);
      return dataJson;
    } catch (err) {
      console.log(err);
    }
};
  const saveFile = async (params,pathFile) => {
    try {
      const filePath = path.resolve(__dirname,`../../${pathFile}.json`)
      const data = JSON.stringify(params, null, "\t");
      await fs.promises.writeFile(filePath, data);
    } catch (err) {
      console.log(err);
    }
};
  const validateBody = (data) => {
    if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw createError(400,'Datos invalidos');
  }

  module.exports = {
    readFile,
    saveFile,
    validateBody
  }