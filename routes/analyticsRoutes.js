// Import necessary modules
const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { bloodGroupDetailsContoller } = require("../controllers/analyticsController");

// Create a router object to handle analytics-related routes
const router = express.Router();

// Route to get detailed analytics for blood groups
// Auth middleware ensures only authenticated users can access the data
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

// Export the router for use in the app
module.exports = router;
