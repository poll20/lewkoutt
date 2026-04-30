const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccount/serviceAccount.json"); // safe + clean
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const COOKIE_NAME = "session";

const verifySessionCookie = async (req, res, next) => {
  try {
    /* =========================
       1️⃣ SESSION COOKIE (NORMAL BROWSER)
    ========================= */
    const sessionCookie = req.cookies?.[COOKIE_NAME];
    if (sessionCookie) {
      const decoded = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      req.user = decoded;
      return next();
    }

    /* =========================
       2️⃣ BEARER TOKEN (IN-APP BROWSER)
    ========================= */
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];
      const decoded = await admin.auth().verifyIdToken(token);
      req.user = decoded;
      return next();
    }

    return res.status(401).json({
      message: "Unauthorized: No session or token",
    });
  } catch (err) {
    console.error("❌ Auth verification failed:", err);
    return res.status(401).json({
      message: "Invalid or expired authentication",
    });
  }
};

module.exports = verifySessionCookie;
