class RatePrototype {
  constructor() {
    // Default Rate values
    this.userID = null; // User ID will be set when creating a new rate
    this.cabinID = null; // Cabin ID will be set when creating a new rate
    this.bookingID = null; // Booking ID will be set when creating a new rate
    this.rating = 0; // Default rating value
    this.comment = ""; // Default comment value
  }

  // Clone the prototype and modify specific fields
  clone(user, cabin, booking, rating, comment) {
    const clonedRate = Object.create(this);

    clonedRate.userID = user;
    clonedRate.cabinID = cabin;
    clonedRate.bookingID = booking;
    clonedRate.rating = rating;
    clonedRate.comment = comment;

    return clonedRate;
  }
}

module.exports = new RatePrototype(); // Export an instance of the prototype
