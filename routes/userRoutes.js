const express = require("express");
const authController = require("../controllers/userController");
const router = express.Router();

const { authenticateJWT } = require("../middlewares/userMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
