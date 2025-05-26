const Booking = require("../../models/booking"); // Import the Booking model
const Cabin = require("../../models/cabin"); // Import the Cabin model
const User = require("../../models/user"); // Import the User model
const PrototypeInterface = require("./prototypeInterface.js");

// Base booking prototype
const booking = {
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  numGuests: 2,
  cabinPrice: 100,
  extrasPrice: 0,
  status: "confirmed",
  hasBreakfast: false,
  isPaid: false,
  observations: "",
  cabin: null,
  user: null,
};

class BookingPrototype extends PrototypeInterface {
  constructor() {
    super();
    this.booking = {}; // will be set by concreatePrototype
  }

  concreatePrototype(booking) {
    this.booking = booking;
  }

  // Clone only - no modifications, just a raw copy
  clone() {
    return { ...this.booking };
  }

  // Apply dynamic values and return a Mongoose Booking instance
  async customize(
    clonedBooking,
    {
      startDate,
      endDate,
      numGuests,
      cabinPrice,
      extrasPrice,
      hasBreakfast,
      observations,
      userId,
      cabinId,
    }
  ) {
    // Assign fields (use fallback from prototype if needed)
    clonedBooking.startDate = startDate || this.booking.startDate;
    clonedBooking.endDate = endDate || this.booking.endDate;
    clonedBooking.numGuests = numGuests ?? this.booking.numGuests;
    clonedBooking.cabinPrice = cabinPrice ?? this.booking.cabinPrice;
    clonedBooking.extrasPrice = extrasPrice ?? this.booking.extrasPrice;
    clonedBooking.hasBreakfast = hasBreakfast ?? this.booking.hasBreakfast;
    clonedBooking.observations = observations || this.booking.observations;
    clonedBooking.status = "confirmed";
    clonedBooking.isPaid = false;

    // Fetch referenced documents
    const cabin = await Cabin.findById(cabinId);
    const user = await User.findById(userId);
    if (!cabin || !user) {
      throw new Error("Cabin or User not found");
    }

    clonedBooking.cabin = cabin._id;
    clonedBooking.user = user._id;

    return clonedBooking;
  }

  async getCabinPrice(cabinId) {
    const cabin = await Cabin.findById(cabinId);
    return cabin ? cabin.regularPrice : 0;
  }
}

const bookingPrototype = new BookingPrototype();
bookingPrototype.concreatePrototype(booking);
module.exports = bookingPrototype;
