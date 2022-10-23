const router = require("express").Router();
const reservationController = require("../controllers/reservation.controller");

// restaurant
// router.get("/", reservationController.getAllRestaurant);
// router.get("/:id", reservationController.restaurantInfo);
router.post("/addReservation", reservationController.addReservation);

module.exports = router;
