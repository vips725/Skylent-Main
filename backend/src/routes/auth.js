const express = require("express");

const { login, logout, me } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const { validateLogin } = require("../validation/auth.schema");

const router = express.Router();

router.post("/login", validateLogin, login);
router.get("/me", authenticateToken, me);
router.post("/logout", logout);

module.exports = router;
