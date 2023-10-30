const pool = require("../contants/pool");

const initializeDatabaseConnection = async () => {
  const client = await pool.connect();
  try {
    // Create the "images" table if it doesn't exist
    const createTableQuery = `
          CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            url TEXT NOT NULL,
            image BYTEA NOT NULL
          );
        `;
    await client.query(createTableQuery);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  } finally {
    console.log('Table "images" created');
    client.release();
  }
};

module.exports = initializeDatabaseConnection;
