// Import necessary modules
const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

// Create a router object to handle inventory-related routes
const router = express.Router();

// Route to create new inventory (add blood records)
// POST request with authentication required
router.post("/create-inventory", authMiddelware, createInventoryController);

// Route to get all blood inventory records
// GET request with authentication required
router.get("/get-inventory", authMiddelware, getInventoryController);

// Route to get the most recent blood inventory records
router.get("/get-recent-inventory", authMiddelware, getRecentInventoryController);

// Route to get inventory records specific to hospitals
router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);

// Route to get donor records
router.get("/get-donars", authMiddelware, getDonarsController);

// Route to get hospital records
router.get("/get-hospitals", authMiddelware, getHospitalController);

// Route to get organisation records
router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);

// Route to get organisation records for hospitals
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

// Export the router for use in the app
module.exports = router;
