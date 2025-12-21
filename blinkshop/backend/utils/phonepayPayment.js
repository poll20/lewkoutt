const axios = require("axios");
const crypto = require("crypto");
const { getPhonePeAccessToken } = require("./phonepayAuth");

const PHONEPE_BASE_URL = "https://api.phonepe.com/apis/pg/checkout"; // PRODUCTION

async function createPhonePePayment({
  merchantOrderId,
  amount,
  userId,
  redirectUrl
}) {
  const accessToken = await getPhonePeAccessToken();

  const payload = {
    merchantOrderId,
    amount: amount * 100, // paise
    redirectUrl,
    metaInfo: {
      udf1: userId,
      udf2: merchantOrderId,
    }
  };

  const response = await axios.post(
    `${PHONEPE_BASE_URL}/v2/pay`,
    payload,
    {
      headers: {
        Authorization: `O-Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

module.exports = { createPhonePePayment };
