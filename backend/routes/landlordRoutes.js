const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getLandlordDashboard } = require("../controllers/landlordController");

router.get(
  "/dashboard",
  protect,
  authorizeRoles("landlord"),
  getLandlordDashboard
);

module.exports = router;
