// Import necessary modules
const express = require("express");   // Express framework for building the server
const dotenv = require("dotenv");     // dotenv for loading environment variables
const colors = require("colors");     // colors module for console logging with colors
const morgan = require("morgan");     // morgan for logging HTTP requests
const cors = require("cors");         // cors to handle Cross-Origin Resource Sharing
const connectDB = require("./config/db"); // Import the MongoDB connection configuration

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database using the connection function
connectDB();

// Initialize Express app (rest object)
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to allow Cross-Origin Resource Sharing (CORS) for API requests
app.use(cors());

// Middleware to log HTTP requests in the development environment using Morgan
app.use(morgan("dev"));

// Routes - these routes handle different parts of the application's functionality

// Test routes for checking if the server is running properly
app.use("/api/v1/test", require("./routes/testRoutes"));

// Authentication routes for user login, registration, etc.
app.use("/api/v1/auth", require("./routes/authRoutes"));

// Inventory-related routes for blood inventory management
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

// Analytics routes for reporting blood group data
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));

// Admin routes for managing donors, hospitals, and organisations
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Port configuration - uses environment variable PORT or defaults to 8080
const PORT = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
      .bgBlue.white
  );
});
