const express = require("express");

const { login } = require("../controllers/authController");
const { validateLogin } = require("../validation/auth.schema");

const router = express.Router();

router.post("/login", validateLogin, login);

module.exports = router;