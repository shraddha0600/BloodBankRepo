// Import user model and necessary libraries
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); // for password hashing
const jwt = require("jsonwebtoken"); // for token generation

// ===================== REGISTER USER ==========================
/**
 * Controller to handle user registration.
 * Hashes the password and stores the user in the database.
 * 
 * @param {Object} req - The request object containing HTTP request data (user details).
 * @param {Object} res - The response object used to send back data to the client.
 */
const registerController = async (req, res) => {
  try {
    // Destructure the necessary fields from the request body
    const { name, email, password, role } = req.body;

    // Check if the user already exists by email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and save to database
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role, // 'donor', 'hospital', or 'organisation'
    });
    await newUser.save();

    // Send success response
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// ===================== LOGIN USER ==========================
/**
 * Controller to handle user login.
 * Verifies the password and generates a JWT token.
 * 
 * @param {Object} req - The request object containing HTTP request data (email and password).
 * @param {Object} res - The response object used to send back data to the client.
 */
const loginController = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Check if the user exists by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token valid for 1 day
    });

    // Send success response with token
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// Export the controller functions
module.exports = { registerController, loginController };
