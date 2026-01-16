const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/userModel");
const db = require("../config/database"); // Import MySQL connection
require("dotenv").config();

const tokenBlacklist = new Set(); // Store blacklisted tokens

const authController = {
    register: async (req, res) => {
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

            const sql = 'SELECT * FROM users WHERE userName = ?';
            
            console.log(" #### Checking duplicate entry of user ---------- ");
            const response = await db.query(sql, [userName], (err, results) => {
                if (err) {                
                    console.error("DB Error:", err);
                    return callback(err, null);
                }
                
                if (results.length === 0) {
                    // User not found
                    return callback(null, null);
                }
                
                // User found, return the first row
                const user = results[0];
                return callback(null, user);
            });



            console.log("DB Response:", response);
            
            if (response[0].length > 0) {
                return res.status(409).json({
                    message: "Username or Email already exists"
                });
            }

            //
            if (
                !firstName ||
                !lastName ||
                !userName ||
                !email ||
                !password ||
                !confirmPassword ||
                !description
            ) {
                return res.status(401).json({
                    message: "All fields are required"
                });
            }

            if (password !== confirmPassword) {
                return res.status(422).json({
                    message: "Passwords do not match"
                });
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
                    console.error("authController/register:  Database Error:", err);
                    return res.status(500).json({
                        message: "Database error"
                    });
                }
                if (results.length > 0) {
                    return res
                        .status(409)
                        .json({
                            message: "Username or Email already exists"
                        });
                }
            });

            authModel.create(newUser, (err, result) => {
                if (err) {
                    console.error(
                        "authController/register:  Error Inserting User:",
                        err
                    );
                    return res.status(500).json({
                        message: "Database error"
                    });
                }
                console.log(
                    "authController/register:  User Registered Successfully:",
                    result
                );
                res.status(201).json({
                    message: "Account created successfully"
                });
            });
        } catch (error) {
            console.error(
                "authController/register:  Error in Register Function:",
                error
            );
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },

    login: async (req, res) => {
        console.log("authController/login: Login Attempt:", req.body);
        // authController/login: Login Attempt: { username: 'user', password: 'user' }
        // console.log(req)
        
        const { username, password } = req.body;

        console.log(username, password)
        const sql = 'SELECT * FROM users WHERE userName = ?';

        const response = await db.query(sql, [username], (err, results) => {
            console.log("inside db.query");
            if (err) {                
                console.error("DB Error:", err);
                return callback(err, null);
            }
            
            if (results.length === 0) {
                // User not found
                return callback(null, null);
            }

            // User found, return the first row
            const user = results[0];
            return callback(null, user);
        });

        console.log("DB Response:", response);

        let userData = response[0][0];

        console.log("User Data Retrieved:", userData.userName);

        console.log("userName Retrieved:", userData.userName);
        console.log("Password Retrieved:", userData.password);

        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {            
            console.log(" Password is correct! Login successful");
        } else {
            console.log(" Invalid password");
        }
        
        // Hash password before compairing
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Hashed pass: ", hashedPassword);
        
        // Create JWT token
        const token = jwt.sign(
            {
                id: 1,              // user id from DB
                username: "test_user",
                userType: "student"
            },
            process.env.JWT_SECRET,       // secret key
            { expiresIn: "1h" }           // token expiry
        );

        res.cookie("spy", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        //


        const dummyResponse = {
            success: true,
            message: "Login successful"
        }

        // console.log("authController/login: JWT Token Created:", token);
        
        return res.status(200).json(dummyResponse);
        
    },

    logout: (req, res) => {
        try {
            // Cookie-parser must be enabled in app.js
            const spyCookie = req.cookies?.spy;

            // If no cookie, still allow logout (idempotent)
            if (!spyCookie) {
                return res.status(200).json({
                    message: "Already logged out"
                });
            }

            // Blacklist token
            tokenBlacklist.add(spyCookie);
            console.log("authController/logout:  Token Blacklisted:", spyCookie);

            // Clear cookie (MUST match cookie options used while setting it)
            res.clearCookie("spy", {
                httpOnly: true,
                sameSite: "Lax",          // must match login
                secure: process.env.NODE_ENV === "production",
                path: "/",                // VERY IMPORTANT
            });

            return res.status(200).json({
                message: "Logged out successfully"
            });

        } catch (error) {
            console.error("Logout Error:", error);
            return res.status(500).json({
                message: "Error logging out",
                error: error.message
            });
        }
    },

};

module.exports = authController;