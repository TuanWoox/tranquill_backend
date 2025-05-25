const Cabin = require("../../models/cabin");
require("dotenv").config();

const defaultCabin = {
  name: "Standard Cabin",
  maxCapacity: 2,
  regularPrice: 100,
  discount: 0,
  description: "A simple, cozy cabin.",
  image: "default-cabin.jpg",
};

class CabinPrototype {
  constructor() {
    this.cabin = defaultCabin;
  }

  concreatePrototype(cabin) {
    this.cabin = cabin;
  }

  // Return a raw clone of the prototype
  clone() {
    return { ...this.cabin };
  }

  // Customize the cloned cabin with new values
  customize(
    clonedCabin,
    {
      name,
      maxCapacity,
      regularPrice,
      discount = 0,
      description = "",
      image = "",
    }
  ) {
    clonedCabin.name = name || this.cabin.name;
    clonedCabin.maxCapacity = maxCapacity ?? this.cabin.maxCapacity;
    clonedCabin.regularPrice = regularPrice ?? this.cabin.regularPrice;
    clonedCabin.discount = discount;
    clonedCabin.description = description || this.cabin.description;
    clonedCabin.image = image || this.cabin.image;

    return clonedCabin; // Return a Mongoose instance
  }
}

const cabinPrototype = new CabinPrototype();
cabinPrototype.concreatePrototype(defaultCabin);
module.exports = cabinPrototype;
