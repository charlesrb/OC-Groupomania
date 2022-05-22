const jwt = require("jsonwebtoken");

// declaration de dotenv pour la recuperation des donnees 'token' du fichier .env
require("dotenv").config({ path: "./config/.env" });

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Utilisateur non autorisé";
    } else {
      req.auth = { userId };
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide !"),
    });
  }
};
