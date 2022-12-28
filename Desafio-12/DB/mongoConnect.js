import mongoose from "mongoose";
import { config } from "../src/config/global.js";

const connectionString = config.URI


export const initMongoDb = async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(connectionString);
    console.log("Ready");
  } catch (error) {
    console.log(error);
  }
};
