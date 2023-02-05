const router = require("express").Router();
const restaurantController = require("../controllers/restaurant.controller");

// restaurant
router.get("/", restaurantController.getAllRestaurant);
router.get("/:id", restaurantController.getRestaurant);
router.put("/blockRestaurant/:id", restaurantController.blockRestaurant);
// router.put("/:id", restaurantController.updateRestaurant);
// router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
