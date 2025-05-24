const BookingDAO = require("../DAO/BookingDAO");
const bookingPrototype = require("../patterns/prototype/bookingPrototype");
const { eachDayOfInterval } = require("date-fns");

module.exports.getAllBookings = async function (req, res) {
  const { id } = req.user;

  try {
    const bookings = await BookingDAO.findBookingByCustomerId(id);
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getOneBooking = async function (req, res) {
  const { id } = req.user;
  const { bookingId } = req.query;

  try {
    const foundBooking = await BookingDAO.findBookingById(bookingId);

    if (
      !foundBooking ||
      (req.user.role !== "admin" && foundBooking.user._id.toString() !== id)
    ) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    return res.status(200).json(foundBooking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getBookingsWithCabinId = async (req, res) => {
  try {
    const bookings = await BookingDAO.findBookingByCabinId(req.query.cabinId);
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.deleteBooking = async function (req, res) {
  const { id } = req.user;
  const { id: bookingId } = req.body;
  try {
    const booking = await BookingDAO.findBookingById(bookingId);

    if (!booking || booking.user.toString() !== id) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    const deletedBooking = await BookingDAO.deleteBookingById(bookingId);
    return res.status(200).json(deletedBooking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.updateBooking = async function (req, res) {
  const { id } = req.user;
  const { bookingId, ...updatedData } = req.body.data;

  try {
    const booking = await BookingDAO.findBookingById(bookingId);

    if (
      !booking ||
      (req.user.role !== "admin" && booking.user.toString() !== id)
    ) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }
    if (new Date(booking.startDate) <= new Date()) {
      return res.status(400).json({
        message: "Start date has passed, you cannot update this booking.",
      });
    }

    const updatedBooking = await BookingDAO.updateBookingById(
      bookingId,
      updatedData
    );

    return res.status(200).json(updatedBooking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getBookedDates = async function (req, res) {
  const { cabinId } = req.params;
  try {
    const booked = await BookingDAO.getBookedDatesByCabinId(cabinId);
    const bookedDates = booked
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();
    return res.status(200).json(bookedDates);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.createBooking = async function (req, res) {
  try {
    const { id } = req.user;
    const clonedBooking = await bookingPrototype.clone(
      req.body.startDate,
      req.body.endDate,
      req.body.numGuests,
      req.body.cabinPrice,
      req.body.extrasPrice,
      req.body.hasBreakfast,
      req.body.observations,
      id,
      req.body.cabin
    );
    const savedBooking = await BookingDAO.save(clonedBooking);

    return res
      .status(201)
      .json({ message: "Booking Successfully", savedBooking });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
