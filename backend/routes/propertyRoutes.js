const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  createProperty,
  getProperties,
  getPropertyById,
  getMyProperties,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");

// Get all properties (public)
router.get("/", getProperties);

// Landlord: get their own properties
router.get("/my", protect, authorizeRoles("landlord"), getMyProperties);

// Get single property
router.get("/:id", getPropertyById);

// Update property (owner only)
router.put("/:id", protect, authorizeRoles("landlord"), updateProperty);

// Delete property (owner only)
router.delete("/:id", protect, authorizeRoles("landlord"), deleteProperty);

// Landlord creates a property
router.post(
  "/",
  protect,
  authorizeRoles("landlord"),
  createProperty
);

module.exports = router;
