// Import the Mongoose library to define the schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the inventory model
const inventorySchema = new mongoose.Schema(
  {
    // Inventory type can either be "in" (blood donation) or "out" (blood issued)
    inventoryType: {
      type: String,
      required: [true, "inventory type required"],
      enum: ["in", "out"], // Define acceptable values for inventoryType
    },

    // Blood group type, with a limited set of acceptable values
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"], // Specify allowed blood groups
    },

    // Quantity of blood in liters or units (depending on how it's measured)
    quantity: {
      type: Number,
      required: [true, "blood quantity is required"], // Ensure that quantity is always provided
    },

    // Donor or organisation email associated with the inventory
    email: {
      type: String,
      required: [true, "Donor/Organisation email is required"],
    },

    // Organisation responsible for managing the blood inventory
    organisation: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the users collection
      ref: "users",
      required: [true, "organisation is required"],
    },

    // Hospital receiving blood (required only if inventoryType is "out")
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out"; // Required only when blood is issued (inventoryType is "out")
      },
    },

    // Donor providing blood (required only if inventoryType is "in")
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in"; // Required only when blood is being donated (inventoryType is "in")
      },
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the inventory model, which can be used to interact with the "inventories" collection in MongoDB
module.exports = mongoose.model("Inventory", inventorySchema);
