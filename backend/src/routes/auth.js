const express = require("express");

const { login, logout, me, changePassword } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const { validateLogin, validateChangePassword } = require("../validation/auth.schema");

const router = express.Router();

router.post("/login", validateLogin, login);
router.get("/me", authenticateToken, me);
router.post("/logout", logout);
router.post("/change-password", authenticateToken, validateChangePassword, changePassword);

module.exports = router;
