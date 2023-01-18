import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "../config/logs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../utils/randoms.util.js");

export const randoms = async (req, res) => {
  try {
    const randomProcess = fork(filePath);
    const { cant } = req.query;

    randomProcess.send({ msg: "start", cant });
    randomProcess.on("message", (number) => {
      res.json({
        number,
      });
    });
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
