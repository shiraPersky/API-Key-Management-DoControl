import { pool } from "./pool";
import { ApiKeyRow } from "../models/apiKey.types";

export const KeysRepository = {
  async insertKey(params: {
    accountId: string;
    name: string;
    prefix: string;
    secretHash: string;
  }): Promise<ApiKeyRow> {
    const { accountId, name, prefix, secretHash } = params;

    const res = await pool.query<ApiKeyRow>(
      `INSERT INTO api_keys ("accountId", name, prefix, secret_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, "accountId", name, prefix, secret_hash, created_at, revoked_at`,
      [accountId, name, prefix, secretHash]
    );

    return res.rows[0];
  },

  async listByAccountId(accountId: string): Promise<ApiKeyRow[]> {
    const res = await pool.query<ApiKeyRow>(
      `SELECT id, "accountId", name, prefix, secret_hash, created_at, revoked_at
       FROM api_keys
       WHERE "accountId" = $1
       ORDER BY created_at DESC`,
      [accountId]
    );

    return res.rows;
  },

  async revokeKeyById(id: string): Promise<ApiKeyRow | null> {
  const res = await pool.query<ApiKeyRow>(
    `UPDATE api_keys
     SET revoked_at = NOW()
     WHERE id = $1 AND revoked_at IS NULL
     RETURNING id, "accountId", name, prefix, secret_hash, created_at, revoked_at`,
    [id]
  );

  if (res.rows.length > 0) {
    return res.rows[0];
  }

  const existing = await pool.query<ApiKeyRow>(
    `SELECT id, "accountId", name, prefix, secret_hash, created_at, revoked_at
     FROM api_keys
     WHERE id = $1`,
    [id]
  );

  return existing.rows[0] ?? null;
},
};


