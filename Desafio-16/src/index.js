import server from "./services/server.js";
import initWsServer from "./services/socket.service.js";
import { config } from "./config/global.js";
import { initDB } from "./services/db.service.js";

const init = async () => {
  try {
    await initDB();
    initWsServer(server);
    server.listen(config.PORT, () => {
      console.log(`Server up: ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
init();
