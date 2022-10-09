const jwt = require("jsonwebtoken");
// Tokens
// const JWT_SECRET = "thisismysecretforjwt";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (_id) => {
  const accessToken = jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "365d",
  });
  return accessToken;
};

module.exports = { generateToken };
