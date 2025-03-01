const express = require("express");
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;
