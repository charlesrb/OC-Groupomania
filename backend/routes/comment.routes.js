const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth");

// Routes gestion des Posts

router.get("/", commentController.getComments);

router.post("/", commentController.createComment);

module.exports = router;
