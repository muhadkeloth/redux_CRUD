const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "No token provided, please login" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      const admin = await User.findOne({email:decoded.email, isAdmin:true});  
      if (!admin) {
        return res.status(404).json({ message: "User not found" });
      }

      req.email = admin.email;  //not needed just for understand
      next();
    });
  } catch (error) {
    console.error("Authorization middleware error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = authorization;
