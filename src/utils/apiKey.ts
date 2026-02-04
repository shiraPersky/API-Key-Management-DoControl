import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateApiKeyParts() {
  const prefix = crypto.randomBytes(4).toString("hex");

  const secret = crypto.randomBytes(16).toString("hex"); 

  return { prefix, secret };
}

export async function hashSecret(secret: string): Promise<string> {
  return bcrypt.hash(secret, 10);
}
