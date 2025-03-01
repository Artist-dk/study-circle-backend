const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env file");
}

const SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h"; // Configurable expiry

const Account = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      db.query(`SELECT * FROM users WHERE username = ?`, [username], async (error, result) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ message: "Server error" });
        }

        if (!result.length) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({ message: "Login successful", token });
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  logout: (req, res) => {
    res.status(200).json({ message: "Logged out successfully. Clear the token on the client side." });
  },

  createNew: async (req, res) => {
    try {
      const { FirstName, LastName, UserName, Email, Password, confirmPassword, UserType, MobileNo, ProfilePictureURL, Description } = req.body;

      if (!FirstName || !LastName || !UserName || !Email || !Password || !Description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (Password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const hashedPassword = await bcrypt.hash(Password, 12); // Stronger hashing

      const sql = `INSERT INTO users (firstName, lastName, userName, email, password, userType, phoneNo, profilePictureURL, description)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(sql, [FirstName, LastName, UserName, Email, hashedPassword, UserType, MobileNo, ProfilePictureURL, Description], (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Username or Email already exists" });
          } else if (err.code === "ER_BAD_NULL_ERROR") {
            return res.status(400).json({ message: "Missing required fields" });
          }
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({ message: "Account created successfully" });
      });
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message === "jwt expired" ? "Token expired" : "Invalid token" });
  }
};

module.exports = { Account, authenticateJWT };
