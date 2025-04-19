// adminCheck.js
const User = require("./models/User"); // MongoDB User model

const isAdmin = async (req, res, next) => {
  const { uid } = req.user;
  const user = await User.findOne({ firebaseUID: uid });

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }

  next();
};

module.exports = isAdmin;
