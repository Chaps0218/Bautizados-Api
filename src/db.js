import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});

export default db;