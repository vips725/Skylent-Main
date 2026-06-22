const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const env = require("../config/constants");
const { findUserById, findUserByUsername, updateUserPassword } = require("../data/store");

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

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await findUserById(req.user.sub);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.id, newPasswordHash);

    return res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change failed:", error);
    return res.status(500).json({ success: false, message: "Password change service is temporarily unavailable" });
  }
}

module.exports = {
  login,
  me,
  logout,
  changePassword
};
