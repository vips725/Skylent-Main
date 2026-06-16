const { Pool } = require('pg');

const env = require('../config/constants');

function buildConnectionString() {
  const databaseUrl = new URL(env.DATABASE_URL);

  databaseUrl.searchParams.delete('channel_binding');
  databaseUrl.searchParams.set('sslmode', 'verify-full');

  return databaseUrl.toString();
}

const pool = new Pool({
  connectionString: buildConnectionString(),
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: true,
  },
});

// Log connection errors for easier debugging
pool.on('error', (err) => {
  console.error('Unexpected PG pool error:', err.message);
});

module.exports = { pool };
