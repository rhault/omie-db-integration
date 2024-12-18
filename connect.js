import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

export const connectToDatabase = async () => {
  try {
    const pool = sql.connect(config);
    console.log("Connection to SQL Azure established successfully.");
    return pool;
  } catch (err) {
    console.error("Error connecting to SQL Azure:", err.message);
    process.exit(1);
  }
};
