const { Pool } = require("pg");

// To run locally, change this information to your own machine's postgres credentials
const pool = new Pool({
  user: "user",
  password: "pass",
  host: "postgres",
  port: 5432,
  database: "db",
});

module.exports = pool;
