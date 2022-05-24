const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
// Routes gestion des Users
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.delete("/:id", auth, userController.deleteUser);
router.get("/:id", userController.getOneUser);
// router.put("/:id", multer, userController.updateUser);
// router.put("/:id", userController.modifyUser);

module.exports = router;
