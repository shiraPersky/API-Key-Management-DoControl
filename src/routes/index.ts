import { Router } from "express";
import { pool } from "../database/pool";
import { keysRouter } from "./keys.routes";

export const routes = Router();

routes.get("/try", (_req, res) => {
  res.json({ status: "ok" });
});

routes.get("/debug/db-ping", async (_req, res) => {
  const result = await pool.query("SELECT 1 as ok");
  res.json({ db: "ok", result: result.rows[0] });
});


routes.use(keysRouter);
