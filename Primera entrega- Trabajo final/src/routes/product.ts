import { Router, Request, Response, NextFunction } from "express";
import { auth } from "../config";
import filesManager from "../controllers/files";
import productManager from "../controllers/products";
import { ProductsType } from "../utils/globals";


const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataJson: [ProductsType] = await filesManager.readFile('products')

        res.json({
            dataJson
        })
    } catch (error) {
        next(error)
    }
})
productsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParams: string = req.params.id
        const dataJson = await productManager.getProductoById(idParams)

        res.json({
            dataJson
        })
    } catch (error) {
        next(error)
    }
})
productsRouter.post('/', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        if (!filesManager.validationBody(body)) {
            res.status(401).json({
                msg: 'Datos invalidos'
            })
        } else {
            await productManager.saveProduct(body)
            res.json({
                msg: 'El producto se agrego correctamente'
            })
        }
    } catch (error) {
        next(error)
    }
})
productsRouter.put('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParams: string = req.params.id
        const { body } = req
        if (!filesManager.validationBody(body)) {
            res.status(401).json({
                msg: 'Datos invalidos'
            })
        } else {

            await productManager.upgradeProduct(idParams, body)

            res.json({
                msg: ` El producto con id ${idParams} se modificó correctamente`
            })
        }
    } catch (error) {
        next(error)
    }
})
productsRouter.delete('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParams: string = req.params.id

        await productManager.deleteProduct(idParams)

        res.json({
            msg: `El producto con id: ${idParams} Se eliminó correctamente `
        })
    } catch (error) {
        next(error)
    }
})

export default productsRouter