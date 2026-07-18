const client = require("./redisClient"); // Redis client

/**
 * cacheMiddleware
 * @param {function} keyGeneratorFn - function to generate cache key from req
 * @param {number} ttl - cache expiration time in seconds
 */
function cacheMiddleware(keyGeneratorFn, ttl = 300) {
  return async function (req, res, next) {
    try {
      const cacheKey = keyGeneratorFn(req);
      const cachedData = await client.get(cacheKey);

      // if (cachedData) {
      //   console.log(`👉 Cache hit for ${cacheKey}`);
      //   return res.json(JSON.parse(cachedData));
      // }
      if (cachedData) {
  res.set(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300"
  );

  console.log(`👉 Cache hit for ${cacheKey}`);
  return res.json(JSON.parse(cachedData));
}

      // ✅ Override res.json to store cache before sending
      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        await client.setEx(cacheKey, ttl, JSON.stringify(body));
        console.log(`👉 Cached data for ${cacheKey} for ${ttl}s`);
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Redis caching error:", err.message);
      next(); // Redis fail ho jaye, API continue ho
    }
  };
}

module.exports = cacheMiddleware;
