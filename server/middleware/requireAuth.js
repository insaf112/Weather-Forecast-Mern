const jwt = require("jsonwebtoken");
const { User } = require("../Models/ModelSchemas");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required" });
  }
  // Get token from the Bearer String

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(400).json({ error: "Not authorized to access this content" });
  }
};
module.exports = requireAuth;
