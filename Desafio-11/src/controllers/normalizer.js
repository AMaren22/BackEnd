import { normalize, schema, denormalize } from "normalizr";
import { messageModel } from "../models/modelMessage.js";
import { normModel } from "../models/modelNormalize.js";
class Messages {
  constructor() {}

  user = new schema.Entity(
    "users",
    {},
    {
      idAttribute: "email",
    }
  );
  message = new schema.Entity(
    "message",
    { author: this.user },
    { idAttribute: "id" }
  );
  finalSchema = new schema.Array(this.message);

  async original() {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }
  async normalizer() {
    try {
      const messagesJson = await messageModel.find();
      const dataNormalizer = normalize(messagesJson, this.finalSchema);
      await normModel.create(dataNormalizer);
    } catch (error) {
      throw new Error(error);
    }
  }
  async desnormalize() {
    try {
      const data = await normModel.find();
      const data2 = data[0];
      const desnormalizeData = denormalize(
        data2.result,
        this.finalSchema,
        data2.entities
      );
      return desnormalizeData;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const messageManager = new Messages();

export default messageManager;
