const router = require("express").Router();
const planningController = require("../controllers/planning.controller");

// planning
router.get("/:id", planningController.getPlanning);

module.exports = router;
