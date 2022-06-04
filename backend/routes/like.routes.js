const { Router } = require("express");
const router = Router();
const likeController = require("../controllers/like.controller");
// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config") // import rename nom fichier img

// Routes gestion des Posts

router.post("/", likeController.addLike);
router.get("/", likeController.isLike);

module.exports = router;
