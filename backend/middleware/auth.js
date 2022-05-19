const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    if (!decodedToken) {
      throw new Error("Invalid token");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(405).json({ message: "Unauthorized request!" });
    console.log("=> Unauthorized request !");
  }
};
