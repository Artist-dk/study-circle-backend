const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/userModel");
require("dotenv").config();

const tokenBlacklist = new Set(); // Store blacklisted tokens

const authController = {
  register: (req, res) => {
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
        description,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !userName ||
        !email ||
        !password ||
        !confirmPassword ||
        !description
      ) {
        return res.status(401).json({ message: "All fields are required" });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ message: "Passwords do not match" });
      }

      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        password,
        userType,
        phoneNo,
        profilePictureURL,
        description,
      };

      authModel.findByUsernameOrEmail(userName, (err, results) => {
        if (err) {
          console.error("authController/register: ❌ Database Error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
          return res
            .status(409)
            .json({ message: "Username or Email already exists" });
        }

        authModel.create(newUser, (err, result) => {
          if (err) {
            console.error(
              "authController/register: ❌ Error Inserting User:",
              err
            );
            return res.status(500).json({ message: "Database error" });
          }
          console.log(
            "authController/register: ✅ User Registered Successfully:",
            result
          );
          res.status(201).json({ message: "Account created successfully" });
        });
      });
    } catch (error) {
      console.error(
        "authController/register: ❌ Error in Register Function:",
        error
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    authModel.findByUsernameOrEmail(username, (error, results) => {
      if (error) {
        console.error("authController/login: ❌ DB Error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!results.length) {
        console.log("authController/login: 🚫 User Not Found:", username);
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      console.log("authController/login: 🆔 Fetched User:", user);
      console.log("authController/login: 🔑 Entered Password:", password);
      console.log(
        "authController/login: 🔐 Stored Hashed Password:",
        user.password
      );

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      console.log(
        "authController/login: ✅ Password Match Result:",
        isPasswordValid
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("spy", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 3600000, // 1 hour expiration
      });
      console.log("authController/login: ✅ Login Successful, Token:", token);

      res.status(200).json({ message: "Login successful" });
    });
  },

  logout: (req, res) => {
    try {
      const spyCookie = req.cookies["spy"];

      if (!spyCookie) {
        return res.status(400).json({ message: "No token provided" });
      }

      tokenBlacklist.add(spyCookie);
      console.log("authController/logout: 🚪 Token Blacklisted:", spyCookie);

      res.clearCookie("spy", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error logging out", error: error.message });
    }
  },
};

module.exports = authController;
