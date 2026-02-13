const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { adminPanel } = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  adminPanel
);

module.exports = router;
