const BookingDAO = require("../DAO/BookingDAO");

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
  const { bookingId } = req.body;

  try {
    const foundBooking = await BookingDAO.findBookingById(bookingId);

    if (!foundBooking || foundBooking.user.toString() !== id) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
    }

    return res.status(200).json(foundBooking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.deleteBooking = async function (req, res) {
  const { id } = req.user;
  const { _id: bookingId } = req.body;

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

    if (!booking || booking.user.toString() !== id) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized" });
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
