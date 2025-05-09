const mongoose = require("mongoose");
const Booking = require("./models/booking"); // Your booking model
const Cabin = require("./models/cabin"); // Your cabin model
const User = require("./models/user"); // Your user model

// Ensure MongoDB connection is established
mongoose
  .connect("mongodb://localhost:27017/tranquill_retreat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increased timeout
    socketTimeoutMS: 45000, // Timeout for socket operations
  })
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const createSeedBookings = async () => {
  try {
    // Fetch user by email
    const user = await User.findOne({ email: "z1venttt@gmail.com" });
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch all cabins
    const cabins = await Cabin.find({});
    if (cabins.length === 0) {
      throw new Error("No cabins found");
    }

    // Generate multiple bookings for users and cabins
    const bookings = [
      {
        startDate: new Date("2025-05-10"),
        endDate: new Date("2025-05-12"),
        numNights: 2,
        numGuests: 4,
        cabin: cabins[0]._id, // Cabin: Cozy Pine Retreat
        user: user._id, // User: Nguyễn Tuấn Vuxxx
        hasBreakfast: true,
      },
      {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-05"),
        numNights: 4,
        numGuests: 6,
        cabin: cabins[1]._id, // Cabin: Mountain View Escape
        user: user._id, // Same user for simplicity, or adjust accordingly
        hasBreakfast: false,
      },
      {
        startDate: new Date("2025-07-10"),
        endDate: new Date("2025-07-15"),
        numNights: 5,
        numGuests: 5,
        cabin: cabins[2]._id, // Cabin: Lakeside Hideaway
        user: user._id, // Same user
        hasBreakfast: true,
      },
      {
        startDate: new Date("2025-08-20"),
        endDate: new Date("2025-08-22"),
        numNights: 2,
        numGuests: 8,
        cabin: cabins[3]._id, // Cabin: Rustic Ranch Cabin
        user: user._id, // Same user
        hasBreakfast: false,
      },
      {
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-09-03"),
        numNights: 2,
        numGuests: 3,
        cabin: cabins[4]._id, // Cabin: Sunny Hilltop Cabin
        user: user._id, // Same user
        hasBreakfast: true,
      },
    ];

    // Insert multiple bookings into the database
    for (const bookingData of bookings) {
      const cabin = await Cabin.findById(bookingData.cabin);
      if (!cabin) {
        throw new Error("Cabin not found");
      }

      // Calculate the cabin price after discount
      const cabinPrice =
        cabin.regularPrice - (cabin.regularPrice * cabin.discount) / 100;
      const totalPrice = cabinPrice * bookingData.numNights;

      // Create the booking document
      const booking = new Booking({
        ...bookingData,
        cabinPrice,
        totalPrice,
        status: "unconfirmed",
      });

      // Save the booking
      await booking.save();
    }

    console.log("Multiple bookings created successfully!");
  } catch (error) {
    console.error("Error creating seed bookings: ", error);
  }
};

// Call the function to create the seed bookings
createSeedBookings();
