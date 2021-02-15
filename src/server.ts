import express, { Application } from "express";
import cors from "cors";

import { errorHandler, notFoundHandler } from "./middleware";
import apiRouter from "./routes";

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use("/api/books", apiRouter);

app.use(errorHandler);

app.use(notFoundHandler);

export default app;
