const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth");

// Routes gestion des Posts

router.get("/", commentController.getComments);
router.put("/:id", auth, commentController.modifyComment);

router.post("/", auth, commentController.createComment);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
