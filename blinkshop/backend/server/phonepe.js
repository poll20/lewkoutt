// const axios = require('axios');

// async function getPhonePeToken() {
//   const requestHeaders = { "Content-Type": "application/x-www-form-urlencoded" };
  
//   const requestBody = new URLSearchParams({
//     client_id: process.env.CLIENT_ID,       // tumhara sandbox client id
//     client_secret: process.env.CLIENT_SECRET, // tumhara sandbox client secret
//     grant_type: "client_credentials",
//     client_version:1
//   }).toString();

//   try {
//     const response = await axios.post(
//       'https://api.phonepe.com/apis/identity-manager/v1/oauth/token',
//       requestBody,
//       { headers: requestHeaders }
//     );
//     console.log("PhonePe token fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("PhonePe token fetch error:", error.response?.data || error.message);
//     throw new Error("PhonePe token fetch failed");
//   }
// }

// module.exports = { getPhonePeToken };


const axios = require('axios');

let cachedToken = null;
let tokenExpiry = null;

async function getPhonePeToken() {
  // ✅ Agar cache me valid token hai to wahi return karo
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const requestHeaders = { "Content-Type": "application/x-www-form-urlencoded" };

  const requestBody = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
    client_version: "1" // ✅ string me bhejna
  }).toString();

  try {
    const response = await axios.post(
      "https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
    
      requestBody,
      { headers: requestHeaders }
    );

    console.log("✅ PhonePe token fetched:", response.data);

    // ✅ Token aur expiry save karo cache me
    cachedToken = response.data;
    const expiresIn = response.data.expires_in || 900; // default 15 min
    tokenExpiry = Date.now() + expiresIn * 1000;

    return cachedToken;
  } catch (error) {
    console.error("❌ PhonePe token fetch error:", error.response?.data || error.message);
    throw new Error("PhonePe token fetch failed");
  }
}

module.exports = { getPhonePeToken };
