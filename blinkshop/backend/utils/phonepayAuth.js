const axios = require("axios");

let cachedToken = null;
let tokenExpiry = null;

// 🔑 Get PhonePe Access Token
async function getPhonePeAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  // ✅ If token exists & not expired → reuse
  if (cachedToken && tokenExpiry && now < tokenExpiry - 60) {
    return cachedToken;
  }

  try {
    const url = "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"; // PRODUCTION

    const body = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      client_version: process.env.CLIENT_VERSION,
      grant_type: "client_credentials",
    });

    const response = await axios.post(url, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    cachedToken = response.data.access_token;
    tokenExpiry = response.data.expires_at; // epoch seconds

    console.log("✅ PhonePe Token Generated");

    return cachedToken;
  } catch (err) {
    console.error("❌ PhonePe Token Error:", err.response?.data || err.message);
    throw new Error("Unable to generate PhonePe access token");
  }
}

module.exports = { getPhonePeAccessToken };
