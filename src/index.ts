import dotenv from "dotenv";

import server from "./server";

dotenv.config();

(() => {
  const API_PORT = process.env.API_PORT || 3030;

  server.listen(API_PORT, () => {
    console.info(`Server is running on http://localhost:${API_PORT}`);
  });
})();
