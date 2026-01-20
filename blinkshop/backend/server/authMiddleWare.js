// authMiddleware.js
const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccount/serviceAccount.json"); // safe + clean
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const COOKIE_NAME = "session"; // same as backend me set kiya tha
const verifySessionCookie = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies[COOKIE_NAME];
    if (!sessionCookie) {
      return res.status(401).json({ message: "Unauthorized: No session cookie" });
    }  

    // 🔑 Verify Firebase session cookie
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    req.user = decoded; // ab user ka uid, phone, email sab aa jayega
    next();
  } catch (err) {
    console.error("❌ Session verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

module.exports = verifySessionCookie ;
