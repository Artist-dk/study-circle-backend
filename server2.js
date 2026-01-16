

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = 5000;

/* =======================
   MIDDLEWARES
======================= */
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

/* =======================
   MYSQL CONNECTION
======================= */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Temp#1234",
  database: "studycircle"   // change if needed
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

/* =======================
   TOKEN BLACKLIST (LOGOUT)
======================= */
const tokenBlacklist = new Set();

/* =======================
   REGISTER USER
======================= */
app.post("/user/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      userType,
      phoneNo,
      profilePictureURL,
      description
    } = req.body;

    if (!firstName || !lastName || !userName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match" });
    }

    const checkSql = "SELECT * FROM users WHERE userName = ? OR email = ?";
    db.query(checkSql, [userName, email], async (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (results.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO users 
        (firstName, lastName, userName, email, password, userType, phoneNo, profilePictureURL, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          firstName,
          lastName,
          userName,
          email,
          hashedPassword,
          userType,
          phoneNo,
          profilePictureURL,
          description
        ],
        (err) => {
          if (err) return res.status(500).json({ message: "Insert failed" });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* =======================
   LOGIN USER
======================= */
app.post("/user/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username & password required" });
  }

  const sql = "SELECT * FROM users WHERE userName = ? OR email = ?";
  db.query(sql, [username, username], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (!results.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("spy", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000
    });

    res.status(200).json({ message: "Login successful" });
  });
});

/* =======================
   LOGOUT USER
======================= */
app.post("/user/logout", (req, res) => {
  const token = req.cookies.spy;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  tokenBlacklist.add(token);

  res.clearCookie("spy", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict"
  });

  res.status(200).json({ message: "Logged out successfully" });
});

/* =======================
   SERVER START
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Auth server running at http://localhost:${PORT}`);
});
