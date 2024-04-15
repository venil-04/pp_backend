const Booking = require("../model/Booking.js");

exports.createbooking = async (req, res) => {
  try {
    const { partyPlotId, userId, bookingDates } = req.body;

    // Create a new booking instance
    const newBooking = new Booking({
      partyPlotId,
      userId,
      bookingDates,
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Return the saved booking as JSON response
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Error creating booking" });
  }
};
