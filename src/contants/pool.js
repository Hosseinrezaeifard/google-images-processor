const { Pool } = require("pg");

// Provide your own pool's information here
const pool = new Pool({
  user: "postgres",
  password: "hrf05001399@",
  host: "localhost",
  port: 5432,
  database: "task-manager",
});

module.exports = pool;
