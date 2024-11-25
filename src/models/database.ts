import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // 設置最大連接數，可以根據需要調整
  queueLimit: 0
})
// 測試連接是否正常
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("已連線到資料庫");
    connection.release(); // 釋放連接回連接池
  } catch (err: any) {
    console.error("資料庫連線錯誤", err.message);
  }
}
testConnection();
export default db;