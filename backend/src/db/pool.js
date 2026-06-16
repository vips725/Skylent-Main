const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Let the connection string handle SSL settings automatically.
  // If your Neon password has @ # ? & + / \ = :  etc, paste the URL exactly as Neon gives it.
});

// Log connection errors for easier debugging
pool.on('error', (err) => {
  console.error('Unexpected PG pool error:', err.message);
});

module.exports = { pool };