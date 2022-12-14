import mongoose from "mongoose";

export const normCollectionName = "msgNormalize";

export const normSchema = new mongoose.Schema({
  entities: { type: Object },
  result: { type: Array },
});

export const normModel = mongoose.model(normCollectionName, normSchema);
