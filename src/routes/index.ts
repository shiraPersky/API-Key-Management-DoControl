import { Router } from "express";

export const routes = Router();

routes.get("/try", (_req, res) => {
  res.json({ status: "ok" });
});
