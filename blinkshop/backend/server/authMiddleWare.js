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
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
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
