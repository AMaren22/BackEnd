import { args } from "../config/process.config.js";
import os from "os";

export const infoProcess = async (req, res) => {
  try {
    const dataObject = {
      args: args,
      folderPath: process.cwd(),
      processPID: process.pid,
      nodeVersion: process.version,
      processTitle: process.title,
      os: process.platform,
      memoryUsage: process.memoryUsage(),
      more: process.argv,
      CPUsNumbers: os.cpus().length,
    };
    res.status(200).json({
      data: dataObject,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
