// Import necessary modules
const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
} = require("../controllers/adminController");

// Create a router object to handle admin-related routes
const router = express.Router();

// Route to get the list of donors
// Only accessible to authenticated admins
router.get(
  "/donar-list",
  authMiddelware,       // Ensures the user is authenticated
  adminMiddleware,      // Ensures the user is an admin
  getDonarsListController // Controller handling the request logic
);

// Route to get the list of hospitals
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);

// Route to get the list of organisations
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);

// Route to delete a donor by ID (admin-only access)
router.delete(
  "/delete-donar/:id",
  authMiddelware,
  adminMiddleware,
  deleteDonarController
);

// Export the router to be used in other parts of the app
module.exports = router;
