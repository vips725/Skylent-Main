const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const env = require("../config/constants");
const { findUserById, findUserByUsername } = require("../data/store");

function buildUserResponse(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role
  };
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    const isValidPassword = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!user || !isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        role: user.role
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      token,
      user: buildUserResponse(user)
    });
  } catch (error) {
    console.error("Login failed:", error);

    return res.status(500).json({
      success: false,
      message: "Login service is temporarily unavailable"
    });
  }
}

async function me(req, res) {
  try {
    const user = await findUserById(req.user.sub);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      user: buildUserResponse(user)
    });
  } catch (error) {
    console.error("Fetch current user failed:", error);

    return res.status(500).json({
      success: false,
      message: "User service is temporarily unavailable"
    });
  }
}

function logout(req, res) {
  return res.json({
    success: true,
    message: "Logged out"
  });
}

module.exports = {
  login,
  me,
  logout
};
