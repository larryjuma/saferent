const RentalRequest = require('../models/rentalRequest');
const Property = require('../models/Property');

// TENANT → REQUEST PROPERTY
exports.createRentalRequest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // prevent landlord requesting own property
    if (property.landlord.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot request your own property' });
    }

    // prevent duplicate requests
    const existingRequest = await RentalRequest.findOne({
      property: property._id,
      tenant: req.user._id
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    const request = await RentalRequest.create({
      property: property._id,
      tenant: req.user._id,
      landlord: property.landlord
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LANDLORD → VIEW REQUESTS
exports.getLandlordRequests = async (req, res) => {
  try {
    const requests = await RentalRequest.find({ landlord: req.user._id })
      .populate('property')
      .populate('tenant', 'name email');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LANDLORD → APPROVE / REJECT
exports.updateRequestStatus = async (req, res) => {
  try {
    const request = await RentalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.landlord.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = req.body.status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
