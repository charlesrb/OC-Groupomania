const jwt = require("jsonwebtoken");

// declaration de dotenv pour la recuperation des donnees 'token' du fichier .env
require("dotenv").config({ path: "./config/.env" });

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.authorId && req.body.authorId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
