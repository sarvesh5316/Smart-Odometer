const express = require("express");
const router = express.Router();

// for user routing
const UserRoutes = require("./userRoutes");
router.use("/user", UserRoutes);

// for km reading routing
const KMRoutes = require("./KMRoutes");
router.use("/kmroutes", KMRoutes);

module.exports = router;
