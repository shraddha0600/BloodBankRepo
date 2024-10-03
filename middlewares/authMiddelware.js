// Import necessary libraries
const jwt = require("jsonwebtoken");

/**
 * Middleware to verify and authenticate a user using JWT tokens.
 * Checks if the token is valid and decodes the user information from the token.
 * 
 * @param {Object} req - The request object containing HTTP request data.
 * @param {Object} res - The response object used to send back data to the client.
 * @param {Function} next - The next middleware function to be called.
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers (Authorization field)
    const token = req.headers.authorization;

    // If no token is provided, respond with an error
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization Token Missing",
      });
    }

    // Verify and decode the token using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object for further use
    req.user = decoded.userId;

    // Call the next middleware or controller function
    next();
  } catch (error) {
    console.log(error);
    // Respond with an error if token verification fails
    return res.status(401).send({
      success: false,
      message: "Invalid Authorization Token",
      error,
    });
  }
};

// Export the middleware function
module.exports = authMiddleware;
