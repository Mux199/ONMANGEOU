const router = require("express").Router();
const planningController = require("../controllers/planning.controller");

// restaurant
router.get("/", planningController.getAllPlanning);
router.get("/:id", planningController.getPlanning);
router.post("/addPlanning", planningController.addPlanning);

module.exports = router;
