import express, { Application } from "express";

import { errorHandler, notFoundHandler } from "./middleware";
import apiRouter from "./routes";

(() => {
  const API_PORT = 3030;

  const app: Application = express();

  app.use(express.json());

  app.use("/api/books", apiRouter);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(API_PORT, () => {
    console.info(`Server is running on http://localhost:${API_PORT}`);
  });
})();
