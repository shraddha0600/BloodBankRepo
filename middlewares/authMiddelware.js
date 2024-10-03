// Import necessary libraries
const jwt = require("jsonwebtoken");


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
