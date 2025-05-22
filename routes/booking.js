const express = require("express");
const router = express.Router({ mergeParams: true });
const bookingController = require("../controller/booking");
const authMiddleware = require("../middleware/authMiddleware");
router
  .route("/getAllBookings")
  .get(authMiddleware.authenticateToken, bookingController.getAllBookings);
router
  .route("/deleteBooking")
  .delete(authMiddleware.authenticateToken, bookingController.deleteBooking);

router
  .route("/getOneBooking")
  .get(authMiddleware.authenticateToken, bookingController.getOneBooking);

router
  .route("/updateBooking")
  .post(authMiddleware.authenticateToken, bookingController.updateBooking);

router
  .route("/getBookedDates/:cabinId")
  .get(authMiddleware.authenticateToken, bookingController.getBookedDates);

router
  .route("/createBooking")
  .post(authMiddleware.authenticateToken, bookingController.createBooking);

module.exports = router;
