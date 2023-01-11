import cluster from "cluster";
import express from "express";
import os from "os";
import { infoProcess } from "./controllers/infoProcess.controller.js";
import { randoms } from "./controllers/infoRandoms.controller.js";
import { args } from "./config/process.config.js";

const numsCPUs = os.cpus().length;
const { puerto, modo } = args;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (modo === "cluster" && cluster.isPrimary) {
  console.log(`Cantidad de nucleos del sistema: ${numsCPUs}`);
  console.log(`PID MASTER: ${process.pid}`);
  for (let i = 0; i < numsCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code) => {
    console.log(`Worker ${worker.process.pid} with code ${code}`);
    cluster.fork();
  });
} else {
  app.get("/info", infoProcess);
  app.get("/api/randoms", randoms);

  app.listen(puerto, () => {
    console.log(`Server up : ${puerto}`);
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
      message,
    });
  });
}
