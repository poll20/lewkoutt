// adminCheck.js
const {userr} = require("../database/collection.js"); // MongoDB User model

const isAdmin = async (req, res, next) => {
  // const { uid } = req.user;
  // const user = await userr.findOne({ uid: uid });

  if (userr.role !== "admin") {
    console.log("a")
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }

  next();
};

module.exports = isAdmin;
