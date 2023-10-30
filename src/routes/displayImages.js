const express = require("express");
const pool = require("../constants/pool");
const router = express.Router();

// Define your image processing logic here
router.get("/display-images", async (req, res) => {
  try {
    const client = await pool.connect();

    try {
      // Select image data from the database
      const query = "SELECT url, image FROM images";
      const result = await client.query(query);

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "No images found in the database." });
      }

      // Send the image data to the client
      result.rows.forEach((row) => {
        res.write(
          `<img src="data:image/png;base64,${row.image.toString(
            "base64"
          )}" alt="${row.url}" /><br>`
        );
      });
      res.end();
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving images from the database." });
  }
});

module.exports = router;
