const Reading = require("../models/KMReadings");
exports.addOrUpdateReading = async (req, res) => {
  try {
    const { vehicleId, kmReading } = req.body;

    // Find the existing reading by vehicle ID
    const existingReading = await Reading.findOne({ vehicleId });

    if (existingReading) {
      // Check if the new KM reading is greater than the existing one
      if (kmReading <= existingReading.kmReading) {
        return res.status(400).json({ message: "New KM reading must be greater than the existing reading" });
      }

      // Update the reading
      existingReading.kmReading = kmReading;
      const updatedReading = await existingReading.save();
      return res.status(200).json({ message: "Reading updated successfully", reading: updatedReading });
    } else {
      // Create a new reading if no existing reading found
      const newReading = new Reading({ vehicleId, kmReading });
      await newReading.save();
      return res.status(201).json({ message: "Reading added successfully", reading: newReading });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add or update reading", error });
  }
};

exports.getReadingByVehicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const reading = await Reading.find({ vehicleId });
    if (!reading) {
      return res.status(404).json({ message: "Reading not found" });
    }
    res.status(200).json({ reading });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reading", error });
  }
};

exports.getAllReadings = async (req, res) => {
  try {
    const readings = await Reading.find();
    res.status(200).json({ readings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch readings", error });
  }
};