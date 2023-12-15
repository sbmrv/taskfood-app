const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.token;
  // const deToken = jwt.decode(token);
  console.log("raw token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded token:", decodedToken);
    const user = userModel.findById(decodedToken.userId);
    console.log(`user get using token userID is`, user);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.log("Error verifying JWT:", error);
    return res.status(500).json({ message: "wrong credentials,need login" });
  }
};
