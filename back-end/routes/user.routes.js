const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// authentification
router.post("/register", authController.signUpUser);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.put("/blockUser/:id", userController.blockUser);
router.put("/:id", userController.updateUser);
router.put("likeRestaurant/:id", userController.likeRestaurant);
router.put("unlikeRestaurant/:id", userController.unlikeRestaurant);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;
