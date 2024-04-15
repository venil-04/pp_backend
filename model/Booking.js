const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  partyPlotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PartyPlot', // Reference to the PartyPlot model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  bookingDates: [{
    type: Date,
    required: true
  }],
  status: {
    type: String,
    enum: ['booked', 'not_approve','pending'], // Define possible status values
    default: 'pending' // Default status
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
