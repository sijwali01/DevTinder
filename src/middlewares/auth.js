const jwt = require("jsonwebtoken");
const User = require("../model/user")
const adminAuth = async(req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const verify = jwt.verify(token, "ManisH@0123");
  const user = await User.findById(verify.id);
  if(!user){
    return res.status(401).json({ message: "User not Found" });
  }
  req.user = user;
  next();
};

module.exports = adminAuth;
