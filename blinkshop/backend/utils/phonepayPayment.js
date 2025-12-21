const axios = require("axios");
const { getPhonePeAccessToken } = require("./phonepayAuth");

// ✅ Production URL
const PHONEPE_PAY_URL =
  "https://api.phonepe.com/apis/pg/checkout/v2/pay";

/**
 * Create PhonePe Checkout Payment
 */
async function createPhonePePayment({
  merchantOrderId,
  amount,          // rupees
  userId,
  redirectUrl
}) {
  // 1️⃣ Get Access Token
  const accessToken = await getPhonePeAccessToken();

  // 2️⃣ Build payload EXACTLY as per PhonePe docs
  const payload = {
    merchantOrderId: merchantOrderId,
    amount: amount * 100, // convert to paisa
    paymentFlow: {
      type: "PG_CHECKOUT",
      merchantUrls: {
        redirectUrl: redirectUrl
      }
    },
    metaInfo: {
      udf1: userId,
      udf2: merchantOrderId
    }
  };

  try {
    // 3️⃣ Call PhonePe API
    const response = await axios.post(
      PHONEPE_PAY_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${accessToken}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "PhonePe Create Order Error:",
      error?.response?.data || error.message
    );
    throw error;
  }
}

module.exports = { createPhonePePayment };
