// authMiddleware.js
const admin = require("firebase-admin");

// Firebase Admin SDK initialize


// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FB_PROJECT_ID,
//     clientEmail: process.env.FB_CLIENT_EMAIL,
//     privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   }),
// });
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FB_PROJECT_ID,
//     clientEmail: process.env.FB_CLIENT_EMAIL,
//     privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   }),
// });
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const verifyFirebaseToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split("Bearer ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     req.user = decoded; // UID & email now in req.user
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
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
