const axios = require("axios");
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
    merchantId: process.env.PHONEPE_MERCHANT_ID, // ✅ REQUIRED
    merchantTransactionId: merchantOrderId,      // ✅ REQUIRED
    amount: amount * 100, // paise
    redirectUrl,
    callbackUrl: "https://www.lewkout.com/phonepe/webhook", // ✅ REQUIRED
    paymentInstrument: {
      type: "PAY_PAGE" // ✅ REQUIRED
    },
    metaInfo: {
      udf1: userId,
      udf2: merchantOrderId
    }
  };

  const response = await axios.post(
    `${PHONEPE_BASE_URL}/v2/pay`,
    payload,
    {
      headers: {
        Authorization: `O-Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

module.exports = { createPhonePePayment };
