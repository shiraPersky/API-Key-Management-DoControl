export type ApiKeyRow = {
  id: string;
  accountId: string;
  name: string;
  prefix: string;
  secret_hash: string;
  created_at: string;
  revoked_at: string | null;
};
