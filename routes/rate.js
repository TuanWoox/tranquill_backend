const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("../controller/rate");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/:cabinId/cabinRatings").get(rateController.getCabinRating);

router
  .route("/:bookingId/getRateByBookingId")
  .get(authMiddleware.authenticateToken, rateController.getRateByBookingId);

router
  .route("/rateCabin")
  .post(authMiddleware.authenticateToken, rateController.createRate);

router
  .route("/:rateId/updateRate")
  .put(authMiddleware.authenticateToken, rateController.updateRate);

router
  .route("/:rateId/deleteRate")
  .delete(authMiddleware.authenticateToken, rateController.deleteRate);
module.exports = router;
