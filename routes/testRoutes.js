// Import necessary modules
const express = require("express");
const { testController } = require("../controllers/testController");

// Create a router object to handle test-related routes
const router = express.Router();

// Basic route to test if the server is working
// Calls the testController when a GET request is made to "/"
router.get("/", testController);

// Export the router for use in the app
module.exports = router;
