// Importing the inventoryModel which interacts with the database for inventory data (blood records).
const inventoryModel = require("../models/inventoryModel");

// Importing mongoose for handling MongoDB object types such as ObjectId.
const mongoose = require("mongoose");

// Controller to get blood group details for an organization.
// It calculates the total blood available for each blood group (inflow and outflow).
const bloodGroupDetailsContoller = async (req, res) => {
  try {
    // Defining all blood groups to loop over and fetch data.
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    
    // Array to store the final results for each blood group.
    const bloodGroupData = [];

    // Converting the organization ID from string to MongoDB ObjectId type.
    const organisation = new mongoose.Types.ObjectId(req.body.userId);

    // Looping through each blood group to get inflow (inventoryType: 'in') and outflow (inventoryType: 'out') of blood.
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Count total blood inflow for the specific blood group and organization.
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in", // Only fetching inflow records
              organisation,        // Filtering by the current organization
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }, // Summing up the total inflow quantity.
            },
          },
        ]);

        // Count total blood outflow for the specific blood group and organization.
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out", // Only fetching outflow records
              organisation,         // Filtering by the current organization
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }, // Summing up the total outflow quantity.
            },
          },
        ]);

        // Calculating the available blood by subtracting outflow from inflow.
        const availabeBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        // Storing the data for this blood group in the array.
        bloodGroupData.push({
          bloodGroup,             // The current blood group (e.g., "A+").
          totalIn: totalIn[0]?.total || 0, // Total inflow amount.
          totalOut: totalOut[0]?.total || 0, // Total outflow amount.
          availabeBlood,          // Net available blood.
        });
      })
    );

    // Sending the success response with the blood group data.
    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData,
    });
  } catch (error) {
    // Logging error and sending an error response if any issue occurs during data fetching.
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

// Exporting the blood group details controller for use in routes.
// This controller will be used in 'routes/analyticsRoutes.js'.
module.exports = { bloodGroupDetailsContoller };
