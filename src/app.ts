import express from "express";
import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);