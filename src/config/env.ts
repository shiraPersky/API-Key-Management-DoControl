import "dotenv/config";

function toNumber(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

const dbPassword = process.env.DB_PASSWORD;
console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);


export const env = {
  port: toNumber(process.env.PORT, 3000),
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: toNumber(process.env.DB_PORT, 5432),
    name: process.env.DB_NAME ?? "api_keys_db",
    user: process.env.DB_USER ?? "postgres",
    password: String(dbPassword ?? ""),
    
  },
  
};