const { Router } = require("express");
const router = Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/", postController.getPosts);
router.get("/:id", auth, postController.getOnePost);
router.put("/:id", auth, postController.updatePost);
router.post("/", multer, postController.createPost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;
