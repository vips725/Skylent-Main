const bcrypt = require("bcryptjs");

const env = require("../config/constants");
const { pool } = require("../db/pool");

async function initializeUsers() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT users_username_not_blank CHECK (length(trim(username)) > 0),
      CONSTRAINT users_password_hash_not_blank CHECK (length(trim(password_hash)) > 0),
      CONSTRAINT users_role_valid CHECK (role IN ('admin', 'student', 'organization'))
    );
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_idx
      ON users (lower(username));
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx
      ON users (lower(email))
      WHERE email IS NOT NULL;
  `);

  const passwordHash = await bcrypt.hash(env.DEMO_ADMIN_PASSWORD, 10);

  await pool.query(
    `
      INSERT INTO users (id, username, password_hash, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET
        username = EXCLUDED.username,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        updated_at = NOW();
    `,
    ["user_1", env.DEMO_ADMIN_USERNAME, passwordHash, "admin"]
  );

  return true;
}

async function findUserByUsername(username) {
  const { rows } = await pool.query(
    `
      SELECT id, username, password_hash, role
      FROM users
      WHERE lower(username) = lower($1)
        OR lower(email) = lower($1)
      LIMIT 1;
    `,
    [username]
  );

  const user = rows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    passwordHash: user.password_hash,
    role: user.role
  };
}

module.exports = {
  initializeUsers,
  findUserByUsername
};