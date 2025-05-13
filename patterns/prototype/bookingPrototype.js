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
    newStartDate,
    newEndDate,
    newNumNights,
    newNumGuests,
    cabinId,
    userId,
    extrasPrice = 0
  ) {
    const clonedBooking = Object.create(this);

    // Modify properties specific to the new booking
    clonedBooking.startDate = newStartDate || this.startDate;
    clonedBooking.endDate = newEndDate || this.endDate;
    clonedBooking.numNights = newNumNights || this.numNights;
    clonedBooking.numGuests = newNumGuests || this.numGuests;
    clonedBooking.extrasPrice = extrasPrice || this.extrasPrice;
    clonedBooking.cabinPrice = cabinId
      ? await this.getCabinPrice(cabinId)
      : this.cabinPrice;
    clonedBooking.totalPrice =
      clonedBooking.cabinPrice + clonedBooking.extrasPrice;
    clonedBooking.status = "confirmed"; // Default status
    clonedBooking.hasBreakfast = false; // Default breakfast option
    clonedBooking.isPaid = false; // Default payment status
    clonedBooking.observations = this.observations;

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
