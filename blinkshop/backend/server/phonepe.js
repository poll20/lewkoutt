const axios = require('axios');

async function getPhonePeToken() {
  const requestHeaders = { "Content-Type": "application/x-www-form-urlencoded" };
  
  const requestBody = new URLSearchParams({
    client_id: process.env.CLIENT_ID,       // tumhara sandbox client id
    client_secret: process.env.CLIENT_SECRET, // tumhara sandbox client secret
    grant_type: "client_credentials",
    client_version: 1
  }).toString();

  try {
    const response = await axios.post(
      'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token',
      requestBody,
      { headers: requestHeaders }
    );
    console.log("PhonePe token fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("PhonePe token fetch error:", error.response?.data || error.message);
    throw new Error("PhonePe token fetch failed");
  }
}

module.exports = { getPhonePeToken };
