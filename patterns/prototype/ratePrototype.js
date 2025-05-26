const defaultRate = {
  userId: null, // User Id will be set when creating a new rate
  cabinId: null, // Cabin Id will be set when creating a new rate
  bookingId: null, // Booking Id will be set when creating a new rate
  rating: 0, // Default rating value
  comment: "", // Default comment value
};

class RatePrototype {
  constructor() {
    this.rate = { ...defaultRate };
  }

  concreatePrototype(rate) {
    this.rate = rate;
  }

  // Returns a shallow clone of the default rate object
  clone() {
    return { ...this.rate };
  }

  // Customize the cloned rate with new values
  customize(clonedRate, { userId, cabinId, bookingId, rating, comment }) {
    clonedRate.userId = userId || clonedRate.userId;
    clonedRate.cabinId = cabinId || clonedRate.cabinId;
    clonedRate.bookingId = bookingId || clonedRate.bookingId;
    clonedRate.rating = rating ?? clonedRate.rating; // rating could be 0, so use nullish coalescing
    clonedRate.comment = comment || clonedRate.comment;

    return clonedRate;
  }
}

const ratePrototype = new RatePrototype();
ratePrototype.concreatePrototype(defaultRate);

module.exports = ratePrototype;
