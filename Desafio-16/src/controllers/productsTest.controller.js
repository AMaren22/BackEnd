import { productsTest } from "../services/productsTest.service.js"

export const productsTestController = (req, res) =>{
    const data = productsTest()
    res.render("tablas-test", { data });
}