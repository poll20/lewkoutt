function isCloudinaryUrl(url) {
  return (
    typeof url === "string" &&
    url.includes("res.cloudinary.com/ddbz9m39a")
  );
}

function unique(arr) {
  return [...new Set(arr)];
}

module.exports = {
  isCloudinaryUrl,
  unique,
};