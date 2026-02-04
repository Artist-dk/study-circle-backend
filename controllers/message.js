



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/userModel");
const db = require("../config/database"); // Import MySQL connection
const { saveMessage } = require("./contactusController");
require("dotenv").config();

const tokenBlacklist = new Set(); // Store blacklisted tokens

const Message = {
    saveMessage: async (req, res) => {
        try {  
            const token = req.cookies.spy; // cookie name
        
            console.log("middlewares/jwtAuth.js : token : ", token);
            try {
                // Verify & decode token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
                // Attach user data to request
                req.user = {
                id: decoded.id,
                username: decoded.username,
                userType: decoded.userType,
                };
        
                // console.log("Authenticated User:", req.user);
                // console.log(" #### Saving message ----------: ", req.body);
                const { messageContent } = req.body;
                const messageType = "text";
                // const mediaSource = "null";
                const recipientId = 1;
                const sql = "INSERT INTO messages (senderId, recipientId, messageType, messageContent) VALUES (?, ?, ?, ?)";
                const response = await db.query(sql, [decoded.id, recipientId, messageType, messageContent], (err, results) => {
                    if (err) {                
                        console.error("DB Error:", err);
                        return callback(err, null);
                    }   
                    console.log("DB Response:", results);
                    return callback(null, results);
                });
                console.log("DB Response:", response);
                res.status(201).json({
                    message: "Message saved successfully",
                    data: response[0]
                });
                // next();
            } catch (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            
            let mediaSource = null;
            if (req.file) {
                mediaSource = req.file.path; // Save the file path
            }       



        } catch (error) {
            console.error(
                "controllers/Message.js:  Error in saveMessage:",
                error
            );
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    fetchUsers: async (req, res) => {
        try {
            // console.log(" #### Fetching all users ----------: ", req.body);

            const sql = 'SELECT * FROM users';
            
            const userName = 'admin';
            // console.log(" #### Checking duplicate entry of user ---------- ");
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

            // console.log("DB Response:", response);
            // console.log("Users length:", response[0].length);
            
            if (response[0].length == 0) {
                return res.status(409).json({
                    message: "Users not found"
                });
            }

            res.status(201).json({
                message: "users fetched successfully",
                data: response[0]
            });

        } catch (error) {
            console.error(
                "controllers/Message.js:  Error in fetchUsers:",
                error
            );
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    fetchMessages: async (req, res) => {
        try {
            // console.log(" #### Fetching messages ----------: ", req.query);
            // const sql = "SELECT * FROM messages WHERE ( senderId = ? && recipientId = ?) OR ( senderId = ? && recipientId = ? ) ORDER BY sentAt";
            const sql = "SELECT * FROM messages";
            
            const response = await db.query(sql, [req.query.senderId, req.query.recipientId, req.query.recipientId, req.query.senderId], (err, results) => {
                if (err) {                
                    console.error("DB Error:", err);
                    return callback(err, null);
                }
                if (results.length === 0) {
                    // No messages found
                    return callback(null, null);
                }
                // Messages found
                const messages = results;
                return callback(null, messages);
            });

            // console.log("DB Response:", response);
            // console.log("Messages length:", response[0].length);
            if (response[0].length == 0) {
                return res.status(409).json({
                    message: "No messages found"
                });
            }

            res.status(201).json({
                message: "messages fetched successfully",
                data: response[0]
            });;


        } catch (error) {
            console.error(
                "controllers/Message.js:  Error in fetchMessages:",
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
            return callback(null, results);
        });

        console.log("DB Response:", response);

        let userData = response[0][0];

        console.log(" User Data from DB: ", userData);


        const isMatch = await bcrypt.compare(password, userData.password); // jwt

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
module.exports = Message;