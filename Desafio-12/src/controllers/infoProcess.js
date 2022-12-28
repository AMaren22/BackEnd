import { args } from "../config/process.config.js";

export const infoProcess = async (req, res) => {
  try {
    const dataObject = {
      args: args,
      folderPath: process.cwd(),
      processID: process.pid,
      nodeVersion: process.version,
      processTitle: process.title,
      os: process.platform,
      memoryUsage: process.memoryUsage(),
      more: process.argv
    };
    res.status(200).json({
      data: dataObject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};
