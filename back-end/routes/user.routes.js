const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// authentification
router.post("/register", authController.signUp);

// user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/userBlock/:id", userController.userBlock);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
