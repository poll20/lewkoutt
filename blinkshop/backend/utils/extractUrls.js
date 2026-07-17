const { isCloudinaryUrl } = require("./helpers");

function extractProductUrls(product) {
  const urls = [];

  // Category Image
  if (isCloudinaryUrl(product.image)) {
    urls.push(product.image);
  }

  for (const detail of product.productdetails || []) {

    // Product Images
    for (const img of detail.image || []) {
      if (isCloudinaryUrl(img)) {
        urls.push(img);
      }
    }

    // Colors
    for (const color of detail.colors || []) {

      // Sizes
      for (const size of color.sizes || []) {

        for (const img of size.image || []) {
          if (isCloudinaryUrl(img)) {
            urls.push(img);
          }
        }

      }

    }

  }

  return urls;
}

module.exports = extractProductUrls;