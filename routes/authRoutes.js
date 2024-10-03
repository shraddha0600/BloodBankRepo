// Import necessary modules
const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");

// Create a router object to handle authentication-related routes
const router = express.Router();

// Route to handle user registration
// POST request, no authentication needed for registration
router.post("/register", registerController);

// Route to handle user login
// POST request, no authentication needed for login
router.post("/login", loginController);

// Route to get details of the currently logged-in user
// GET request with authentication required
router.get("/current-user", authMiddelware, currentUserController);

// Export the router for use in the app
module.exports = router;
