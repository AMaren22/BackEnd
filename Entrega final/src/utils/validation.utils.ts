import { ProductsType } from "./globals.interfaces";

class Files {
    constructor() {}
    validationBody(body: ProductsType) {
      if (
        !body.name ||
        !body.description ||
        !body.code ||
        !body.photo ||
        !body.price ||
        !body.stock ||
        typeof body.name !== "string" ||
        typeof body.description !== "string" ||
        typeof body.code !== "number" ||
        typeof body.photo !== "string" ||
        typeof body.price !== "number" ||
        typeof body.stock !== "number" 
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
  
  const validationInput = new Files();
  
  export default validationInput;
  