const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    images: {
      type: [String],
      default: []
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    propertyType: {
      type: String,
      enum: ["apartment", "bedsitter", "house"],
      required: true
    },

    bedrooms: {
      type: Number,
      required: true
    },

    bathrooms: {
      type: Number,
      required: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
