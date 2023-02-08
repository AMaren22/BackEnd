import { Router } from "express";
import { getDesnormalize, getNormalizer, getOriginal } from "../controllers/normalizer.controller.js";


const normalizeRoute = Router()

normalizeRoute.get('/original', getOriginal)
normalizeRoute.get('/normalize', getNormalizer)
normalizeRoute.get('/desnormalize', getDesnormalize)

export default normalizeRoute