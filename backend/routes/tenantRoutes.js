const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { getTenantProfile } = require("../controllers/tenantController");

router.get(
  "/profile",
  protect,
  authorizeRoles("tenant"),
  getTenantProfile
);

module.exports = router;
