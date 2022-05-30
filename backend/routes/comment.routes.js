const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth");

// Routes gestion des Posts

router.post("/", auth, commentController.createComment);

module.exports = router;
