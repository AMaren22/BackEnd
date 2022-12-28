import { Router } from "express";
import { faker } from "@faker-js/faker";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  const products = [];
  for (let i = 0; i < 5; i++) {
    products.push({
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.technics(640, 480, true),
    });
  }
  res.render("tablas-test", { products });
});

export default productsRouter;
