import { Router, Request, Response, NextFunction } from "express";
import cartManager from "../controllers/cart";

const cartRouter = Router();

cartRouter.post("/",async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idCart = await cartManager.createCart();
            res.json({
                msg: `El ID del carrito creado es: ${idCart}`,
            });
        } catch (error) {
            next(error);
        }
    }
);
cartRouter.delete("/:id",async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParams: string = req.params.id;

            await cartManager.deleteCart(idParams);

            res.json({
                msg: `El elemento con Id: ${idParams} se a eliminado correctamente`,
            });
        } catch (error) {
            next(error);
        }
    }
);
cartRouter.get("/:id/productos",async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParams = req.params.id;
            const dataJson = await cartManager.productsByCartId(idParams);

            res.json({
                dataJson,
            });
        } catch (error) {
            next(error);
        }
    }
);
cartRouter.post("/:id/productos",async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParams = req.params.id;
            const { id } = req.body;
            await cartManager.addProductToCart(idParams, id);

            res.json({
                msg: `El prodocto con id:${id} se ha agregado correctamente al cart con id: ${idParams}`,
            });
        } catch (error) {
            next(error);
        }
    }
);
cartRouter.delete("/:id/productos/:id_prod", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idCart = req.params.id;
            const idProduct = req.params.id_prod;

            await cartManager.deleteProductToCart(idCart, idProduct);

            res.json({
                msg: `El producto con id: ${idProduct}, fue eliminado del carrito: ${idCart}`,
            });
        } catch (error) {
            next(error);
        }
    }
);

export default cartRouter;
