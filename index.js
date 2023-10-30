const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const initializeDatabaseConnection = require("./src/utils/initializeDatabaseConnection");

const processImagesRouter = require("./src/routes/processImages");
const displayImagesRouter = require("./src/routes/displayImages");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(processImagesRouter);
app.use(displayImagesRouter);

const start = async () => {
  try {
    await initializeDatabaseConnection();
    console.info("Successfully connected to database");
    app.listen(port, () => {
      console.info(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error(error);
  }
};

start();

module.exports = app;
