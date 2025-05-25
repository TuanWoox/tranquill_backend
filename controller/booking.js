const BookingHandlers = require("../patterns/templateMethod/bookingHandler/index");

module.exports.getAllBookings = async function (req, res) {
  BookingHandlers.getAllBookingsHandler.handle(req, res);
};

module.exports.getOneBooking = async function (req, res) {
  BookingHandlers.getOneBookingHandler.handle(req, res);
};

module.exports.getBookingsWithCabinId = async (req, res) => {
  BookingHandlers.getBookingsWithCabinIdHandler.handle(req, res);
};

module.exports.deleteBooking = async function (req, res) {
  BookingHandlers.deleteBookingHandler.handle(req, res);
};

module.exports.updateBooking = async function (req, res) {
  BookingHandlers.updateBookingHandler.handle(req, res);
};

module.exports.getBookedDates = async function (req, res) {
  BookingHandlers.getBookedDatesHandler.handle(req, res);
};

module.exports.createBooking = async function (req, res) {
  BookingHandlers.createBookingHandler.handle(req, res);
};
