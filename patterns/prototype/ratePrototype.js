class RatePrototype {
  constructor() {
    // Default Rate values
    this.userId = null; // User Id will be set when creating a new rate
    this.cabinId = null; // Cabin Id will be set when creating a new rate
    this.bookingId = null; // Booking Id will be set when creating a new rate
    this.rating = 0; // Default rating value
    this.comment = ""; // Default comment value
  }

  // Clone the prototype and modify specific fields
  clone(user, cabin, booking, rating, comment) {
    const clonedRate = Object.create(this);

    clonedRate.userId = user;
    clonedRate.cabinId = cabin;
    clonedRate.bookingId = booking;
    clonedRate.rating = rating;
    clonedRate.comment = comment;

    return clonedRate;
  }
}

module.exports = new RatePrototype(); // Export an instance of the prototype
