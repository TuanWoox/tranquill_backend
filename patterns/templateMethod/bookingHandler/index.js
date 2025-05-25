const GetAllBookingsHandler = require("./GetAllBookingHandler");
const GetOneBookingHandler = require("./GetOneBookingHandler");
const GetBookingsWithCabinIdHandler = require("./GetBookingsWithCabinIdHandler");
const DeleteBookingHandler = require("./DeleteBookingHandler");
const UpdateBookingHandler = require("./UpdateBookingHandler");
const GetBookedDatesHandler = require("./GetBookedDatesHandler");
const CreateBookingHandler = require("./CreateBookingHandler");

module.exports = {
  getAllBookingsHandler: new GetAllBookingsHandler(),
  getOneBookingHandler: new GetOneBookingHandler(),
  getBookingsWithCabinIdHandler: new GetBookingsWithCabinIdHandler(),
  deleteBookingHandler: new DeleteBookingHandler(),
  updateBookingHandler: new UpdateBookingHandler(),
  getBookedDatesHandler: new GetBookedDatesHandler(),
  createBookingHandler: new CreateBookingHandler(),
};
