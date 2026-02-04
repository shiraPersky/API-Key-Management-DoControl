import { Router } from "express";
import { KeysController } from "../controllers/keys.controller";

export const keysRouter = Router();

//routes for api key per account
keysRouter.post("/accounts/:accountId/keys", KeysController.create);//pass the request to the controller
