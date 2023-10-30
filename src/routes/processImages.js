const express = require("express");
const downloadImages = require("../utils/downloadImages");
const pool = require("../constants/pool");
const router = express.Router();

// Define your image processing logic here
router.post("/process-images", async (req, res) => {
  try {
    // Retrieve user input from req.body, e.g., query and maxImages
    const { query, maxImages } = req.body;

    // Download images
    const images = await downloadImages(query, maxImages);
    // Save them to a database
    await Promise.all(
      images.map(async (image) => {
        const pQuery = {
          text: "INSERT INTO images(url, image) VALUES($1, $2)",
          values: [image.url, image.image],
        };
        await pool.query(pQuery);
      })
    );

    res.status(200).send({
      message: "Images downloaded and stored in the database successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
});

module.exports = router;
