const Booking = require("../../models/booking"); // Import the Booking model
const Cabin = require("../../models/cabin"); // Import the Cabin model (needed for reference)
const User = require("../../models/user"); // Import the User model (needed for reference)

class BookingPrototype {
  constructor() {
    // Default Booking values (as an example)
    this.startDate = new Date();
    this.endDate = new Date(new Date().setDate(new Date().getDate() + 1)); // Default 1-night stay
    this.numNights = 1;
    this.numGuests = 2;
    this.cabinPrice = 100;
    this.extrasPrice = 0;
    this.totalPrice = 100;
    this.status = "confirmed";
    this.hasBreakfast = false;
    this.isPaid = false;
    this.observations = "";
    this.cabin = null; // Will be set when cloning
    this.user = null; // Will be set when cloning
  }

  // Clone the prototype and modify specific fields
  async clone(
    startDate,
    endDate,
    numGuests,
    cabinPrice,
    extrasPrice,
    hasBreakfast,
    observations,
    userId,
    cabinId
  ) {
    const clonedBooking = Object.create(this);

    // Modify properties specific to the new booking
    clonedBooking.startDate = startDate || this.startDate;
    clonedBooking.endDate = endDate || this.endDate;
    clonedBooking.numGuests = numGuests || this.numGuests;
    clonedBooking.cabinPrice = cabinPrice;
    clonedBooking.extrasPrice = extrasPrice || this.extrasPrice;
    clonedBooking.status = "confirmed"; // Default status
    clonedBooking.hasBreakfast = hasBreakfast;
    clonedBooking.isPaid = false; // Default payment status
    clonedBooking.observations = observations;
    // Fetch the Cabin and User objects by their ids
    clonedBooking.cabin = await Cabin.findById(cabinId);
    clonedBooking.user = await User.findById(userId);
    return clonedBooking;
  }

  // Helper method to fetch the cabin price
  async getCabinPrice(cabinId) {
    const cabin = await Cabin.findById(cabinId);
    return cabin ? cabin.regularPrice : 0;
  }
}

module.exports = new BookingPrototype(); // Export an instance of the prototype
