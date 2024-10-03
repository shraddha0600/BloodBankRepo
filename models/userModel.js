// Import the Mongoose library to define the schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the user model
const userSchema = new mongoose.Schema(
  {
    // Role of the user (could be admin, organisation, donor, or hospital)
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donar", "hospital"], // Define allowed roles
    },

    // Name field, required for regular users and admins
    name: {
      type: String,
      required: function () {
        return this.role === "donar" || this.role === "admin"; // Name required for "donar" or "admin" roles
      },
    },

    // Organisation name, required for users with the "organisation" role
    organisationName: {
      type: String,
      required: function () {
        return this.role === "organisation"; // Organisation name required only for organisations
      },
    },

    // Hospital name, required for users with the "hospital" role
    hospitalName: {
      type: String,
      required: function () {
        return this.role === "hospital"; // Hospital name required only for hospitals
      },
    },

    // Email is required for all users and must be unique
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // Ensure email is unique across users
    },

    // Password is required for all users
    password: {
      type: String,
      required: [true, "password is required"],
    },

    // Website (optional) for organisations and hospitals
    website: {
      type: String,
    },

    // Address is required for all users
    address: {
      type: String,
      required: [true, "address is required"],
    },

    // Phone number is required for all users
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the user model, which can be used to interact with the "users" collection in MongoDB
module.exports = mongoose.model("users", userSchema);
