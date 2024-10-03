// Import user model to check for admin privileges
const userModel = require("../models/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    // Retrieve the user details using the user ID from the request (added by authMiddleware)
    const user = await userModel.findById(req.user);

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Access Denied: Admins Only",
      });
    }

    // If the user is an admin, proceed to the next middleware or controller function
    next();
  } catch (error) {
    console.log(error);
    // Respond with an error if there is a problem checking the user's role
    return res.status(500).send({
      success: false,
      message: "Admin Authorization Failed",
      error,
    });
  }
};

// Export the middleware function
module.exports = adminMiddleware;
