const { Router } = require("express");
const router = Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config") // import rename nom fichier img

// Routes gestion des Posts

router.get("/", postController.getPosts);
router.get("/:id", auth, postController.getOnePost);
router.put("/:id", auth, postController.updatePost);
router.post("/", postController.createPost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;
