const crypto = require("crypto");

function verifyPhonePeWebhook(req) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new Error("Missing Authorization Header");
  }

  const base64Creds = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64Creds, "base64").toString("utf8");

  const [username, password] = decoded.split(":");

  if (
    username !== process.env.WEBHOOK_USERNAME ||
    password !== process.env.WEBHOOK_PASSWORD
  ) {
    throw new Error("Invalid webhook credentials");
  }

  return true;
}

module.exports = { verifyPhonePeWebhook };
