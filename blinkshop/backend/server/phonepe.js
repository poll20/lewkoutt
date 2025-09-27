// phonepe.js (backend me)
const axios = require('axios');

async function getPhonePeToken() {
  const requestHeaders = { "Content-Type": "application/x-www-form-urlencoded" };
  const requestBodyJson = { client_version: 1, grant_type: "client_credentials" };
  const requestBody = new URLSearchParams(requestBodyJson).toString();

  const options = {
    method: 'POST',
    url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token',
    headers: requestHeaders,
    data: requestBody
  };

  try {
    const response = await axios.request(options);
    return response.data; // ✅ Token return karega
  } catch (error) {
    console.error("PhonePe token fetch error:", error);
    throw new Error("PhonePe token fetch failed");
  }
}

module.exports = { getPhonePeToken };
