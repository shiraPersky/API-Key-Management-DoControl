import { KeysRepository } from "../database/keys.repository";
import { generateApiKeyParts, hashSecret } from "../utils/apiKey";

export const KeysService = {
  async createKey(accountId: string, name: string) {
    const { prefix, secret } = generateApiKeyParts();
    const secretHash = await hashSecret(secret);

    const row = await KeysRepository.insertKey({
      accountId,
      name,
      prefix,
      secretHash,
    });

    return {
      id: row.id,
      accountId: row.accountId,
      name: row.name,
      prefix: row.prefix,
      createdAt: row.created_at.toString(),
      revokedAt: row.revoked_at ? row.revoked_at.toString() : null,

      apiKey: `${prefix}.${secret}`, // returned only once

    };
  },
  async listKeys(accountId: string) {
    const rows = await KeysRepository.listByAccountId(accountId);

    return rows.map((row) => ({
        id: row.id,
        accountId: row.accountId,
        name: row.name,
        prefix: row.prefix,
        createdAt: row.created_at.toString(),
        revokedAt: row.revoked_at ? row.revoked_at.toString() : null,
    }));
},

async revokeKey(accountId: string, keyId: string) {
  const row = await KeysRepository.revokeKeyById(keyId);

  if (!row) {
    throw new Error("Key not found");
  }

  if (row.accountId !== accountId) {
    throw new Error("Key does not belong to this account");
  }

  return {
    id: row.id,
    accountId: row.accountId,
    name: row.name,
    prefix: row.prefix,
    createdAt: row.created_at.toString(),
    revokedAt: row.revoked_at ? row.revoked_at.toString() : null,
  };
},


};
