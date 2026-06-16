const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../backend/.env")
});

const app = require("../backend/src/app");
const { initializeUsers } = require("../backend/src/data/store");

const ready = initializeUsers();

module.exports = async (req, res) => {
  await ready;
  return app(req, res);
};
