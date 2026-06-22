const { z } = require("zod");

const loginSchema = z.object({
  username: z.string()
    .trim()
    .min(1, "Username or email is required")
    .max(255, "Username or email is too long"),
  password: z.string()
    .min(1, "Password is required")
    .max(128, "Password is too long")
});

function validateLogin(req, res, next) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid login request",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  req.body = result.data;
  return next();
}

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required").max(128, "Old password is too long"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128, "New password is too long"),
});

function validateChangePassword(req, res, next) {
  const result = changePasswordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid password change request",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  req.body = result.data;
  return next();
}

module.exports = {
  loginSchema,
  validateLogin,
  changePasswordSchema,
  validateChangePassword
};