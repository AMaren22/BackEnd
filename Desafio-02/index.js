const fs = require("fs");
const path = require("path");

const archivo = `${__dirname}/productos.txt`;
const existeArchivo = fs.existsSync(`${__dirname}/productos.txt`);

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
    const data = await fs.promises.readFile(archivo, "utf-8");
    return (this.arrContainer = JSON.parse(data));
  }
  async saveFile(dataArray) {
    const data = JSON.stringify(dataArray, null, "\t");
    await fs.promises.writeFile(archivo, data);
  }

  async save(object) {
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
  }
  async getById(number) {
    await this.readFile();

    const result = this.arrContainer.findIndex(
      (element) => element.id === number
    );
    if (result < 0) {
      return null;
    } else {
      return this.arrContainer[result];
    }
  }
  async getAll() {
    await this.readFile();
    return this.arrContainer;
  }
  async deleteById(number) {
    await this.readFile();

    const deleteElement = this.arrContainer.filter(
      (element) => element.id !== number
    );
    this.arrContainer = [];
    this.arrContainer.push(...deleteElement);
    await this.saveFile(this.arrContainer);
  }
  async deteleAll() {
    await this.readFile();

    this.arrContainer = [];
    await this.saveFile(this.arrContainer);
  }
}

const p1 = new Contenedor(archivo);

const obj1 = { title: "Escuadra", price: 123.45, thumbnail: "Hola mundo" };
const obj2 = { title: "Calculadora", price: 234.56, thumbnail: "Hola mundo" };
const obj3 = {
  title: "Globo Terraqueo",
  price: 345.67,
  thumbnail: "Hola mundo",
};

//p1.save(obj3).then((datos) => console.log(datos));
//p1.getById(1).then((data) => console.log(data))
//p1.getAll().then((data) => console.log(data))
//p1.deleteById()
//p1.deteleAll()
