// Quick diagnostic: run with `node test-db.js` to test your Neon connection
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW() as now');
    console.log('✅ Connected to database! Server time:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('❌ Connection failed');
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
    console.error('\nCommon fixes:');
    console.error('1. If your password has # @ ? & + = : / \\ characters, copy the full connection string exactly from the Neon dashboard.');
    console.error('2. Make sure your Neon project is active (free projects sleep after inactivity).');
    console.error('3. Check your firewall/antivirus is not blocking outbound port 5432.');
  } finally {
    await pool.end();
  }
}

test();
