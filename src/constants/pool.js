const { Pool } = require("pg");

// Provide your own pool's information here
const pool = new Pool({
  user: "",
  password: "",
  host: "",
  port: 5432,
  database: "",
});

module.exports = pool;
