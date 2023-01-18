import cluster from "cluster";
import express from "express";
import os from "os";
import compression from "compression";
import { infoProcess } from "./controllers/infoProcess.controller.js";
import { randoms } from "./controllers/infoRandoms.controller.js";
import { args } from "./config/process.config.js";
import { logger } from "./config/logs.js";

const numsCPUs = os.cpus().length;
const { puerto, modo } = args;

//const gzip = compression()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (modo === "cluster" && cluster.isPrimary) {
  logger.info(`Cantidad de nucleos del sistema: ${numsCPUs}`);
  logger.info(`PID MASTER: ${process.pid}`);
  for (let i = 0; i < numsCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code) => {
    logger.info(`Worker ${worker.process.pid} with code ${code}`);
    cluster.fork();
  });
} else {
  app.get("/info", infoProcess, (req,res) =>{
    logger.info(`${req.route} - ${req.method}`)
  });
  app.get("/infocompressed", compression(), infoProcess, (req,res) =>{
    logger.info(`${req.route} - ${req.method}`)
  })
  app.get("/api/randoms", randoms, (req,res) =>{
    logger.info(`${req.route} - ${req.method}`)
  });

  app.listen(puerto, () => {
    logger.info(`Server up : ${puerto}`);
  });

  app.use((req, res) =>{
    logger.warn(`${req.url}`)
    logger.info(`${req.route} - ${req.method}`)
    return res.status(404).json({
      message: `No existe la ruta: ${req.url}`
    })
  })

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
      message,
    });
  });
}
