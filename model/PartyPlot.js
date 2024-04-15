// models/PartyPlot.js

const mongoose = require("mongoose");

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    partyPlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PartyPlot", // Reference to the PartyPlot model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
); // Add timestamps to track when the review was created

// Define the schema for the party plot model
const partyPlotSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
    },
  },
  size: {
    type: String, // You can choose a suitable data type based on your requirements
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  contact: {
    type: String,
    minLength: [10, "Contact should not less than 10 digit."],
    maxLength: [10, "contact should only have 10 digit."],
    required: true,
  },
  photos: [
    {
      url: String, // Cloudinary URL of the photo
    },
  ],
  availability: [
    {
      date: {
        type: Date,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
  ],

  reviews: [reviewSchema], // Array of review subdocuments
  // Add more fields as necessary
});

// partyPlotSchema.index({ name: 1 }); // Index for the name field
// partyPlotSchema.index({ 'location.pincode': 1 }); // Index for the pincode field
// partyPlotSchema.index({ 'location.area': 1 }); // Index for the area field

// Create and export the PartyPlot model
module.exports = mongoose.model("PartyPlot", partyPlotSchema);
