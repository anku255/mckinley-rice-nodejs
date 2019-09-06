const expressJwt = require("express-jwt");

const jwt = () => {
  return expressJwt({ secret: process.env.SECRET_KEY }).unless({
    path: [
      // public routes that don't require authentication
      "/api/register",
      "/api/login"
    ]
  });
};

module.exports = jwt;
