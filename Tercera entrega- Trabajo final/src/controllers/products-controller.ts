import { logger } from "../config/logs.config";
import { ProductsModel } from "../models/products-model";
import { ProductsType } from "../utils/globals";

class Products {
  constructor() {}

  async getProductoById(id: string) {
    try {
      return await ProductsModel.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }
  async saveProduct(data: ProductsType) {
    try {
      const newProduct: ProductsType = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      await ProductsModel.create(newProduct);
    } catch (error) {
      logger.error(error);
    }
  }
  async deleteProduct(id: string) {
    try {
      await ProductsModel.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error);
    }
  }
  async upgradeProduct(id: string, data: ProductsType) {
    const { nombre, descripcion, codigo, foto, precio, stock } = data;
    try {
      await ProductsModel.findByIdAndUpdate(
        id,
        { nombre, descripcion, codigo, foto, precio, stock },
        { new: true }
      );
    } catch (error) {
      logger.error(error);
    }
  }
}

const productManager = new Products();

export default productManager;
