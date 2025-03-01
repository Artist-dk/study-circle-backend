const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const tokenBlacklist = new Set(); // ✅ Store blacklisted tokens

const authController = {
  register: (req, res) => {
    try {
      const { firstName, lastName, userName, email, password, confirmPassword, userType, phoneNo, profilePictureURL, description } = req.body;

      if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const newUser = { firstName, lastName, userName, email, password, userType, phoneNo, profilePictureURL, description };

      User.findByUsernameOrEmail(userName, (err, results) => {
        if (err) {
          console.error("❌ Database Error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
          return res.status(409).json({ message: "Username or Email already exists" });
        }

        User.create(newUser, (err, result) => {
          if (err) {
            console.error("❌ Error Inserting User:", err);
            return res.status(500).json({ message: "Database error" });
          }
          console.log("✅ User Registered Successfully:", result);
          res.status(201).json({ message: "Account created successfully" });
        });
      });

    } catch (error) {
      console.error("❌ Error in Register Function:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    User.findByUsernameOrEmail(username, (error, results) => {
      if (error) {
        console.error("❌ DB Error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!results.length) {
        console.log("🚫 User Not Found:", username);
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      console.log("🆔 Fetched User:", user);
      console.log("🔑 Entered Password:", password);
      console.log("🔐 Stored Hashed Password:", user.password);

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      console.log("✅ Password Match Result:", isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // ✅ Store token in an HTTP-Only Cookie
      res.cookie("token", token, {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 3600000, // 1 hour expiration
      });
      console.log("✅ Login Successful, Token:", token);

      res.status(200).json({ message: "Login successful", token });
    });
  },

  logout: (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

      if (!token) {
        return res.status(400).json({ message: "No token provided" });
      }

      tokenBlacklist.add(token); // ✅ Add token to blacklist
      console.log("🚪 Token Blacklisted:", token);

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error logging out", error: error.message });
    }
  }
};

module.exports = authController;
