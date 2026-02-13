// backend/routes/userRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware'); // ✅ NO destructuring
const router = express.Router();

// Get current logged-in user
router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
