module.exports = (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  // Static images from ImageKit don't need this,
  // ImageKit already serves proper cache headers.

  // Cache API responses for browser
  res.setHeader(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300"
  );

  next();
};