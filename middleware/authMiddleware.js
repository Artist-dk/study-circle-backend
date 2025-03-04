const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../config/db");

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden: Invalid token." });

        req.user = decoded;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const [rows] = await db.execute("SELECT role FROM users WHERE id = ?", [req.user.id]);

        if (!rows.length || rows[0].role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required." });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};


module.exports = { adminAuth, verifyToken, isAdmin };
