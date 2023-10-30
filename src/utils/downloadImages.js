const axios = require("axios");
const cheerio = require("cheerio");
const sharp = require("sharp");

const downloadImages = async (query, numImages) => {
  const googleImagesURL = `https://www.google.com/search?q=${query}&tbm=isch`;

  try {
    const response = await axios.get(googleImagesURL);
    const $ = cheerio.load(response.data);
    const imageDetails = [];

    // Extract image details from the search results
    $("img").each((index, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl) {
        imageDetails.push({ imageUrl });
      }
    });

    //
    const limitedImageDetails = imageDetails.slice(1, numImages);

    if (limitedImageDetails.length) {
      const imagesData = await Promise.all(
        limitedImageDetails.map(async (image) => {
          const imageResponse = await axios.get(image.imageUrl, {
            responseType: "arraybuffer",
          });
          const imageBuffer = imageResponse.data;

          // Resize the image
          const resizedImageBuffer = await sharp(imageBuffer)
            .resize(300, 200) // Adjust the dimensions as needed
            .toBuffer();

          return {
            url: image.imageUrl,
            image: resizedImageBuffer,
          };
        })
      );
      return imagesData;
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = downloadImages;
