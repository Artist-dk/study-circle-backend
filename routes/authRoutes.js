const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const authenticateJWT = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authenticateJWT, authController.logout);

module.exports = router;
