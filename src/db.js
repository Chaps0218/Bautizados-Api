import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
});
export default db;
