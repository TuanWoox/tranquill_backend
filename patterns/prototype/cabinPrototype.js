const Cabin = require("../../models/cabin"); // Import the Cabin model
require("dotenv").config();
class CabinPrototype {
  constructor() {
    // Default Cabin values
    this.name = "Standard Cabin";
    this.maxCapacity = 2;
    this.regularPrice = 100;
    this.discount = 0;
    this.description = "A simple, cozy cabin.";
    this.image = "default-cabin.jpg";
  }

  // Clone the prototype and modify specific fields
  clone(
    newName,
    newMaxCapacity,
    newRegularPrice,
    newDiscount = 0,
    newDescription = "",
    newImage = ""
  ) {
    // Create a new object based on the prototype's properties
    const clonedCabin = Object.create(this);

    // Modify properties specific to the new cabin
    clonedCabin.name = newName || this.name;
    clonedCabin.maxCapacity = newMaxCapacity || this.maxCapacity;
    clonedCabin.regularPrice = newRegularPrice || this.regularPrice;
    clonedCabin.discount = newDiscount || this.discount;
    clonedCabin.description = newDescription || this.description;
    clonedCabin.image = newImage || this.image;

    return clonedCabin;
  }
}

module.exports = new CabinPrototype(); // Export an instance of the prototype
