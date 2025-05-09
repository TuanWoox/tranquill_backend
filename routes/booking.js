const express = require("express");
const router = express.Router({ mergeParams: true });
const bookingController = require("../controller/booking");
const authMiddleware = require("../middleware/authMiddleware");
router
  .route("/getAllBookings")
  .get(authMiddleware.authenticateToken, bookingController.getAllBookings);
router
  .route("/deleteBooking")
  .post(authMiddleware.authenticateToken, bookingController.deleteBooking);

router
  .route("/getOneBooking")
  .post(authMiddleware.authenticateToken, bookingController.getOneBooking);

router
  .route("/updateBooking")
  .post(authMiddleware.authenticateToken, bookingController.updateBooking);
module.exports = router;
