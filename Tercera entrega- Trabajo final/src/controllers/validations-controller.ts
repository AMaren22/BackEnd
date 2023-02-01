import { ProductsType, CartType } from "../utils/globals";

class Files {
  constructor() {}
  validationBody(body: ProductsType) {
    if (
      !body.nombre ||
      !body.descripcion ||
      !body.codigo ||
      !body.foto ||
      !body.precio ||
      !body.stock ||
      typeof body.nombre !== "string" ||
      typeof body.descripcion !== "string" ||
      typeof body.codigo !== "number" ||
      typeof body.foto !== "string" ||
      typeof body.precio !== "number" ||
      typeof body.stock !== "number" 
    ) {
      return false;
    } else {
      return true;
    }
  }
}

const filesManager = new Files();

export default filesManager;
