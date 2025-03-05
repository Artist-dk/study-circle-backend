const mysql = require("mysql2");
require("dotenv").config();

const database = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

database.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err.message);
        return;
    }
    console.log("✅ Connected to MySQL database");
    connection.release();
});

module.exports = database;
