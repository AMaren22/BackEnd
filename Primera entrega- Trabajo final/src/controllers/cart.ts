import { v4 as uuidv4 } from "uuid";
import { CartType, ProductsType } from "../utils/globals";
import filesManager from "./files";

class Cart {
  constructor() {}

  async createCart() {
    try {
      const dataJson: [CartType] = await filesManager.readFile("cart");
      const newCart: CartType = {
        id: uuidv4(),
        timestap: new Date().toLocaleString(),
        productos: [
          {
            id: undefined,
            timestamp: undefined,
            nombre: undefined,
            descripcion: undefined,
            codigo: undefined,
            foto: undefined,
            precio: undefined,
            stock: undefined,
          },
        ],
      };
      dataJson.push(newCart);

      await filesManager.saveFile(dataJson, "cart");

      return newCart.id;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCart(id: string) {
    try {
      const dataJson: [CartType] = await filesManager.readFile("cart");
      const index: number = dataJson.findIndex(
        (itemId: CartType) => itemId.id === id
      );
      if (index < 0) {
        throw "El producto no existe";
      }
      dataJson.splice(index, 1);

      await filesManager.saveFile(dataJson, "cart");
    } catch (error) {
      console.log(error);
    }
  }
  async productsByCartId(id: string) {
    try{
      const dataJson: [CartType] = await filesManager.readFile("cart");
      const index: number = dataJson.findIndex(
        (itemId: CartType) => itemId.id === id
      );
      if (index < 0) {
        throw "El producto no existe";
      }
      return dataJson[index].productos;
    }catch(error){
      console.log(error)
    }
  }
  async addProductToCart(idCart: string, idProduct:string) {
    try{
        const dataJsonCart: [CartType] = await filesManager.readFile("cart");
        const dataJsonProduct: [ProductsType] = await filesManager.readFile('products')
        

        const indexCart: number = dataJsonCart.findIndex(
          (itemId: CartType) => itemId.id === idCart
        );
        const indexProduct: number = dataJsonProduct.findIndex(
            (itemId: ProductsType) => itemId.id === idProduct
        )
        if (indexCart < 0) {
          throw "El carrito no existe";
        }
        if (indexProduct < 0) {
          throw "El producto no existe";
        }
        
        dataJsonCart[indexCart].productos.push(dataJsonProduct[indexProduct])
    
        await filesManager.saveFile(dataJsonCart,'cart') 

    }catch(error){
        console.log(error);
        
    }

  }
  async deleteProductToCart(idCart:string, idProduct:string){
    try{
      const dataJsonCart: [CartType] = await filesManager.readFile("cart");
      const indexCart: number = dataJsonCart.findIndex(
          (itemId: CartType) => itemId.id === idCart
        );
        if (indexCart < 0) {
            throw "El carrito no existe";
          }
          const indexProduct: number = dataJsonCart[indexCart].productos.findIndex(
              (itemId: ProductsType) => itemId.id === idProduct
          )
        if (indexProduct < 0) {
          throw "El producto no existe";
        }
        dataJsonCart[indexCart].productos.splice(indexProduct,1)
        await filesManager.saveFile(dataJsonCart,'cart')
    }catch(error){
      console.log(error)
    }

  }
}

const cartManager = new Cart()

export default cartManager
