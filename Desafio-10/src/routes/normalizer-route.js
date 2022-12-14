import { Router } from "express";
import messageManager from "../controllers/normalizer.js";
import { messageModel } from "../models/modelMessage.js";
import { normModel } from "../models/modelNormalize.js";

const normalizeRoute = Router();

normalizeRoute.get("/original", async (req, res) => {
  const data = await messageManager.original();
  res.json({
    msg: data,
  });
});
/* normalizeRoute.post("/original", async (req, res) => {
  const { author, text } = req.body;
  const newMessage = {
    author,
    text,
  };
  await messageModel.create(newMessage);
  res.json({
    msg: "Mensaje Creado",
  });
}); */
normalizeRoute.get("/normalize", async (req, res) => {
  await messageManager.normalizer();
  const data = await normModel.find();
  res.json({
    data,
  });
});
normalizeRoute.get("/desnormalize", async (req, res) => {
  const data = await messageManager.desnormalize();
  res.json({
    data,
  });
});

export default normalizeRoute;
