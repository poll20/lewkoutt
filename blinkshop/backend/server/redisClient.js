// server/redisClient.js
const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await client.connect();
})();

module.exports = client;
