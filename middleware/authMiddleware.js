const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenBlacklist = new Set(); // Import from authController if needed

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(403).json({ message: "Token has been logged out. Please log in again." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded; // Attach user info to request
    next();
  });
};

module.exports = authMiddleware;
