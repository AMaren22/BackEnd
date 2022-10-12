const fs = require("fs");
const express = require("express");
const archivo = `${__dirname}/productos.txt`;
const existeArchivo = fs.existsSync(`${__dirname}/productos.txt`);

const app = express();

class Contenedor {
  file;
  arrContainer = [];
  id;

  constructor(file) {
    this.file = file;
    if (existeArchivo) {
      return;
    } else {
      const data = JSON.stringify(this.arrContainer, null, "\t");
      fs.writeFileSync(archivo, data);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(archivo, "utf-8");
      return (this.arrContainer = JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  }
  async saveFile(dataArray) {
    try {
      const data = JSON.stringify(dataArray, null, "\t");
      await fs.promises.writeFile(archivo, data);
    } catch (err) {
      console.log(err);
    }
  }

  async save(object) {
    try {
      await this.readFile();
      if (this.arrContainer.length > 0) {
        this.id = this.arrContainer[this.arrContainer.length - 1].id + 1;
      } else {
        this.id = 1;
      }
      object.id = this.id;

      this.arrContainer.push(object);

      await this.saveFile(this.arrContainer);

      return `Id del producto ${this.id}`;
    } catch (err) {
      console.log(err);
    }
  }
  async getById(number) {
    try {
      await this.readFile();

      const result = this.arrContainer.findIndex(
        (element) => element.id === number
      );
      if (result < 0) {
        return null;
      } else {
        return this.arrContainer[result];
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      await this.readFile();
      return this.arrContainer;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteById(number) {
    try {
      await this.readFile();

      const deleteElement = this.arrContainer.filter(
        (element) => element.id !== number
      );
      this.arrContainer = [];
      this.arrContainer.push(...deleteElement);
      await this.saveFile(this.arrContainer);
    } catch (err) {
      console.log(err);
    }
  }
  async deteleAll() {
    try {
      await this.readFile();

      this.arrContainer = [];
      await this.saveFile(this.arrContainer);
    } catch (err) {
      console.log(err);
    }
  }
  randomGenerator(min, max) {
    const result = Math.random() * (max - min) + min;
    return Math.round(result);
  }
  async productosRandom() {
    try {
      await this.readFile();
      const idMax = this.arrContainer[this.arrContainer.length - 1].id;
      const idRandom = this.randomGenerator(1, idMax);
      const result = await this.getById(idRandom);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
const p1 = new Contenedor(archivo);

// Creación del servidor

const server = app.listen(8080, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/productos", (req, resp) => {
  p1.getAll().then((data) => {
    resp.json(data);
  });
});

app.get("/productoRandom", (req, resp) => {
  p1.productosRandom().then((data) => {
    resp.json(data);
  });
});
