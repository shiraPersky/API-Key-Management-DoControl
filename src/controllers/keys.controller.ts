import { Request, Response } from "express";
import { KeysService } from "../services/keys.service";

export const KeysController = {
  async create(req: Request, res: Response) {
    const accountIdRaw = req.params.accountId;
    if (typeof accountIdRaw !== "string" || accountIdRaw.trim().length === 0) {
      return res.status(400).json({ error: { message: "accountId is required" } });
    }
    const accountId = accountIdRaw.trim();//clean whitspaces

    const { name } = req.body as { name?: unknown };
    if (typeof name !== "string" || name.trim().length === 0 || name.length > 60) {
      return res.status(400).json({
        error: { message: "name is required and must be <= 60 chars" },
      });
    }

    const result = await KeysService.createKey(accountId, name.trim());
    return res.status(201).json(result);
  },
};
