// ===================== TEST CONTROLLER ==========================
/**
 * Test controller to check API health.
 * Returns a success message to indicate that the API is running.
 * 
 * @param {Object} req - The request object containing HTTP request data.
 * @param {Object} res - The response object used to send back data to the client.
 */
const testController = async (req, res) => {
  try {
    // Send success response indicating that the API is working fine
    return res.status(200).send({
      success: true,
      message: "API is working fine",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Test API",
      error,
    });
  }
};

// Export the test controller function
module.exports = { testController };
