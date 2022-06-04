require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post/like", likeRoutes);
app.use("/images", express.static(__dirname + "/images"));
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
