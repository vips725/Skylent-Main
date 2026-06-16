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

  const server = app.listen(env.PORT, env.HOST, () => {
    console.log(`Auth API is running at http://${env.HOST}:${env.PORT}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${env.PORT} is already in use. Stop the other process or change PORT in backend/.env.`);
    } else if (error.code === "EACCES" || error.code === "EPERM") {
      console.error(`Cannot bind to ${env.HOST}:${env.PORT}. Try a different HOST/PORT in backend/.env.`);
    } else {
      console.error("Server failed:", error);
    }

    process.exit(1);
  });
}

startServer().catch((error) => {
  console.error("Failed to start Auth API:", error);
  process.exit(1);
});
