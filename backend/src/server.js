require("dotenv").config();

const app = require("./app");
const env = require("./config/constants");
const { initializeUsers } = require("./data/store");

async function startServer() {
  try {
    await initializeUsers();
  } catch (err) {
    console.error("⚠️  Database connection failed:", err.message);
    console.error("   Make sure your DATABASE_URL in .env is correct.");
  }

  app.listen(env.PORT, () => {
    console.log(`Auth API is running on port ${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start Auth API:", error);
  process.exit(1);
});