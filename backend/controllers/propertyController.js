const Property = require("../models/Property");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// CREATE A NEW PROPERTY
exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      isAvailable
    } = req.body;

    const newProperty = {
      landlord: req.user._id,
      title,
      description,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      isAvailable: isAvailable ?? true,
    };

    // Upload image if provided
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "saferent" }
      );
      newProperty.image = result.secure_url;
    }

    const property = await Property.create(newProperty);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROPERTIES (PUBLIC)
exports.getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, type, bedrooms, sort } = req.query;

    let query = { isAvailable: true };

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.propertyType = type;
    if (bedrooms) query.bedrooms = Number(bedrooms);
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;

    const properties = await Property.find(query).sort(sortOption);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROPERTY BY ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "landlord",
      "name email"
    );

    if (!property) return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Invalid property ID" });
  }
};

// GET PROPERTIES OF LOGGED-IN LANDLORD
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROPERTY
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.landlord.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    // Upload new image if provided
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "saferent" }
      );
      req.body.image = result.secure_url;
    }

    Object.assign(property, req.body);
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROPERTY
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.landlord.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
