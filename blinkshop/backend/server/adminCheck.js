// // adminCheck.js
// const {userr} = require("../database/collection.js"); // MongoDB User model

// const isAdmin = async (req, res, next) => {
//   // const { uid } = req.user;
//   // const user = await userr.findOne({ uid: uid });

//   if (userr.role !== "admin") {
//     console.log("a")
//     return res.status(403).json({ message: "Access Denied: Admins only" });
//   }

//   next();
// };

// module.exports = isAdmin;

// adminCheck.js
const { userr } = require("../database/collection.js"); // MongoDB User model

const isAdmin = async (req, res, next) => {
  try {
    const { uid } = req.user; // authMiddleware se aaya
    const user = await userr.findOne({ uid });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    next();
  } catch (err) {
    console.error("Admin check error:", err);
    return res.status(500).json({ message: "Server error during admin check" });
  }
};

module.exports = isAdmin;
