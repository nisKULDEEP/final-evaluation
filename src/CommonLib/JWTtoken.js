const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
  let token = jwt.sign(payload, SECRET_KEY, { expiresIn: "60h" });
  return token;
}

function verifyToken(token) {
  let data = jwt.verify(token, SECRET_KEY);
  return data;
}

module.exports = {
  generateToken,
  verifyToken,
};
