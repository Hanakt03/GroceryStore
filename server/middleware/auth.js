const jwt = require("jsonwebtoken");
require("dotenv/config");

const getTokenFromHeader = (req) => {
  const authorizationHeader = req.headers["authorization"];
  console.log("Test header: " + authorizationHeader);
  const token = authorizationHeader.split(" ")[1];
  console.log(token);
  if (!token) res.status(401);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
module.exports = getTokenFromHeader;
