
const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

const {
  createRentalRequest,
  getLandlordRequests,
  updateRequestStatus
} = require('../controllers/rentalRequestController');

console.log('protect:', protect);
console.log('authorize:', authorize);
console.log('authorize("tenant"):', authorize && authorize('tenant'));
console.log('createRentalRequest:', createRentalRequest);


// TENANT → send request
router.post(
  '/:propertyId',
  protect,
  authorize('tenant'),
  createRentalRequest
);

// LANDLORD → view requests
router.get(
  '/landlord',
  protect,
  authorize('landlord'),
  getLandlordRequests
);

// LANDLORD → approve / reject
router.put(
  '/:id',
  protect,
  authorize('landlord'),
  updateRequestStatus
);

module.exports = router;
