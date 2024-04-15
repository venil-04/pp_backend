const PartyPlot = require("../model/PartyPlot.js");
const cloudinary = require('cloudinary').v2;


function generateAvailability() {
  const availability = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    availability.push({
      date,
      isAvailable: true,
    });
  }
  return availability;
}

// --------for creating partyplot (only owner)------------
exports.createpp = async (req, res) => {
  try {
    const {
      name,
      address,
      area,
      pincode,
      size,
      capacity,
      amenities,
      price,
      description,
      contact,
      photos,
    } = req.body;

    // Convert amenities string to array
    const amenitiesArray = amenities.split(",").map((item) => item.trim());

    const uploadedPhotos = [];
    for (const photo of photos) {
      const result = await cloudinary.uploader.upload(photo);
      uploadedPhotos.push({ url: result.secure_url });
    }

    // Generate availability array for the next 30 days
    const availability = generateAvailability();

    // Create a new party plot instance
    const newPartyPlot = new PartyPlot({
      ownerId: '661ba29869268976c0992a59',
      name,
      location:{
        address,
        area,
        pincode
      },
      size,
      capacity,
      amenities:amenitiesArray,
      price,
      description,
      contact,
      photos:uploadedPhotos,
      availability,
    });

    // Save the party plot to the database
    await newPartyPlot.save();

    res.status(201).json(newPartyPlot);
  } catch (error) {
    console.error("Error creating party plot:", error);
    res.status(500).json({ error: "Error creating party plot" });
  }
};

// ----------update partyplot (only owner)---------

exports.updatepp = async (req, res) => {
  try {
    const { id } = req.params; // Get party plot ID from request parameters
    const updates = req.body; // Get updates from request body

    if (updates.availability) {
      console.log(id);
      const partyplot = await PartyPlot.findOne({ _id: id });
      // console.log(partyplot)

      const arr1 = updates.availability;
      const arr2 = partyplot.availability;

      arr1.forEach((update_ele) => {
        arr2.forEach((saved_ele) => {
          if (
            new Date(update_ele.date).toString().substring(0, 10) ===
            saved_ele.date.toString().substring(0, 10)
          ) {
            console.log("match");
            saved_ele.isAvailable = update_ele.isAvailable;
          }
        });
      });

      await partyplot.save();
      // updates.availability=arr2;
      delete updates.availability;
    }

    // Find the party plot by ID and update it
    const updatedPartyPlot = await PartyPlot.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedPartyPlot) {
      return res.status(404).json({ error: "Party plot not found" });
    }

    res.status(200).json(updatedPartyPlot);
  } catch (error) {
    console.error("Error updating party plot:", error);
    res.status(500).json({ error: "Error updating party plot" });
  }
};

// ----get all partyplot--

exports.getallpp = async (req, res) => {
  try {
    // Fetch all party plots from the database
    const partyPlots = await PartyPlot.find();

    // Check if any party plots were found
    if (partyPlots.length === 0) {
      return res.status(404).json({ message: "No party plots found" });
    }

    // Return the party plots as JSON response
    res.status(200).json(partyPlots);
  } catch (error) {
    console.error("Error retrieving party plots:", error);
    res.status(500).json({ error: "Error retrieving party plots" });
  }
};

// get single partyplot

exports.getsinglepp = async (req, res) => {
  try {
    const { id } = req.params; // Get the party plot ID from request parameters

    // Find the party plot by ID
    const partyPlot = await PartyPlot.findById(id);

    // Check if the party plot was found
    if (!partyPlot) {
      return res.status(404).json({ message: "Party plot not found" });
    }

    // Return the party plot as JSON response
    res.status(200).json(partyPlot);
  } catch (error) {
    console.error("Error retrieving party plot:", error);
    res.status(500).json({ error: "Error retrieving party plot" });
  }
};

// -----delete partyplot (only owner)------

exports.deletepp = async (req, res) => {
  try {
    const { id } = req.params; // Get the party plot ID from request parameters

    // Find the party plot by ID and delete it
    const deletedPartyPlot = await PartyPlot.findByIdAndDelete(id);

    // Check if the party plot was found and deleted
    if (!deletedPartyPlot) {
      return res.status(404).json({ message: "Party plot not found" });
    }

    // Return the deleted party plot as JSON response
    res.status(200).json(deletedPartyPlot);
  } catch (error) {
    console.error("Error deleting party plot:", error);
    res.status(500).json({ error: "Error deleting party plot" });
  }
};

// ---------add review---------

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id } = req.params;

    // Create a new review object
    const newReview = {
      partyPlot: id,
      user: req.user._id,
      rating,
      comment,
    };

    // Find the party plot by ID
    const partyPlot = await PartyPlot.findById(id);

    if (!partyPlot) {
      return res.status(404).json({ message: "Party plot not found" });
    }

    // Add the new review to the party plot's reviews array
    partyPlot.reviews.push(newReview);

    // Save the updated party plot with the new review
    await partyPlot.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Error adding review" });
  }
};
