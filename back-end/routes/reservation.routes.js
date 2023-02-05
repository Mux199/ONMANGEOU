const router = require("express").Router();
const reservationController = require("../controllers/reservation.controller");

// reservation routes
router.get(
  "/getUserReservation/:id",
  reservationController.getAllUserReservation
);
router.get(
  "/getRestaurantReservation/:id",
  reservationController.getAllRestaurantReservation
);

router.post("/addReservation", reservationController.addReservation);
router.put("/cancelReservation", reservationController.cancelReservation);
module.exports = router;
