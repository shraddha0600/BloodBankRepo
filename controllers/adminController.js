// Importing the userModel from the models folder.
// userModel interacts with the database to fetch user data.
const userModel = require("../models/userModel");

// Controller to get a list of all donors from the database.
// This function retrieves users with the role of 'donar' and sorts them by the latest creation date (newest first).
const getDonarsListController = async (req, res) => {
  try {
    // Fetching all donors by finding users with role 'donar' and sorting them in descending order based on 'createdAt'.
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    // Returning the success response with donor data, including a count of total donors.
    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    // Logging error and sending an error response if any issue occurs during fetching.
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar List API",
      error,
    });
  }
};

// Controller to get a list of all hospitals from the database.
// This function retrieves users with the role of 'hospital' and sorts them by the latest creation date (newest first).
const getHospitalListController = async (req, res) => {
  try {
    // Fetching all hospitals by finding users with role 'hospital' and sorting them in descending order based on 'createdAt'.
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    // Returning the success response with hospital data, including a count of total hospitals.
    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    // Logging error and sending an error response if any issue occurs during fetching.
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};

// Controller to get a list of all organizations from the database.
// This function retrieves users with the role of 'organisation' and sorts them by the latest creation date (newest first).
const getOrgListController = async (req, res) => {
  try {
    // Fetching all organizations by finding users with role 'organisation' and sorting them in descending order based on 'createdAt'.
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    // Returning the success response with organization data, including a count of total organizations.
    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    // Logging error and sending an error response if any issue occurs during fetching.
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};

// Controller to delete a donor by their ID.
// This function is triggered when an admin wants to remove a donor's record from the database.
const deleteDonarController = async (req, res) => {
  try {
    // Find the donor by their ID (req.params.id) and delete the record from the database.
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record Deleted successfully",
    });
  } catch (error) {
    // Logging error and sending an error response if any issue occurs during deletion.
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

// Exporting all the controller functions so they can be used in routes.
// These controllers will be connected to specific routes in 'routes/adminRoutes.js'.
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
};
