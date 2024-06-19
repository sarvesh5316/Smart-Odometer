const express = require("express");
const router = express.Router();
const readingController = require("../controllers/KMController");

// Route to add or update a reading
router.post("/addOrUpdate", readingController.addOrUpdateReading);


// Route to fetch all readings
router.get("/", readingController.getAllReadings);

// Route to fetch reading by vehicle ID
router.get("/vehicle/:vehicleId", readingController.getReadingByVehicleId);

module.exports = router;
