import { Router } from "express";
import { keysRouter } from "./keys.routes";

export const routes = Router();


routes.use(keysRouter);
