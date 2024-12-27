import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config()

const pool = createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
})

export { pool }