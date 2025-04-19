// authMiddleware.js
const admin = require("firebase-admin");

// Firebase Admin SDK initialize
const serviceAccount = require("./firebaseServiceAccount.json"); // download this from Firebase > Settings > Service Accounts

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // UID & email now in req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyFirebaseToken;
