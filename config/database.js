const mysql = require('mysql2'); // Use mysql2 for better performance/promise support
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "Temp#1234" || process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert the pool to use Promises (allows us to use async/await)
const database = pool.promise();

// Immediate Connection Test
database.getConnection()
    .then(connection => {
        console.log("✅ Successfully connected to the MySQL database.");
        connection.release(); // Return the connection to the pool
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err.message);
    });

module.exports = database;




// const mysql = require("mysql2");

// // Load the dotenv library
// require('dotenv').config();

// console.log("--- Study Circle Environment Variables ---");

// const envVars = [
//   'PORT',
//   'DB_HOST',
//   'DB_USER',
//   'DB_PASSWORD',
//   'DB_NAME',
//   'JWT_SECRET',
//   'JWT_EXPIRES_IN'
// ];

// envVars.forEach((key) => {
//   // Logs the key and its value from process.env
//   console.log(`${key}: ${process.env[key] || 'NOT FOUND'}`);
// });

// console.log("------------------------------------------");




// const database = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD || 'Temp#1234',
//     database: process.env.DB_NAME,
//     charset: "utf8mb4",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// database.getConnection((err, connection) => {
//     if (err) {
//         console.error("❌ MySQL Connection Error:", err.message);
//         return;
//     }
//     console.log("✅ Connected to MySQL database");
//     connection.release();
// });

// module.exports = database;
