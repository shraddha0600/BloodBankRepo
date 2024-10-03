// Import necessary models
const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");


const addInventoryController = async (req, res) => {
  try {
    // Destructure data from the request body
    const { bloodGroup, quantity, inventoryType, userId } = req.body;

    // Check if the required fields are present
    if (!bloodGroup || !quantity || !inventoryType) {
      return res.status(400).send({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // Create a new inventory record
    const newInventory = new inventoryModel({
      bloodGroup,
      quantity,
      inventoryType,
      organisation: mongoose.Types.ObjectId(userId), // associate inventory with a user (organisation)
    });
    
    // Save the new inventory to the database
    await newInventory.save();

    // Send success response
    return res.status(201).send({
      success: true,
      message: "Inventory Added Successfully",
      newInventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Inventory API",
      error,
    });
  }
};

// ===================== GET INVENTORY LIST ==========================
/**
 * Controller to fetch the list of blood inventories.
 * Filters inventories based on user (organisation) ID and sorts by creation date.
 * 
 * @param {Object} req - The request object containing HTTP request data.
 * @param {Object} res - The response object used to send back data to the client.
 */
const getInventoryListController = async (req, res) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    // Fetch inventory for the specified user (organisation)
    const inventoryList = await inventoryModel
      .find({ organisation: mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 }); // Sort by latest entries

    // Send success response with inventory data
    return res.status(200).send({
      success: true,
      message: "Inventory List Fetched Successfully",
      inventoryList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Inventory List API",
      error,
    });
  }
};

// Export the controller functions
module.exports = { addInventoryController, getInventoryListController };
