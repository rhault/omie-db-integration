import pkg from "pg";
import dotenv from "dotenv";
const { Client } = pkg;

dotenv.config({ override: true });

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: 5432,
  user: "postgres",
  password: process.env.PASSWORD,
  database: "postgres",
  connectionTimeoutMillis: 5000,
});

export default client;
