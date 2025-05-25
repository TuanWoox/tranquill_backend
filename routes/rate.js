const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("../controller/rate");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/:cabinId/getCabinRating").get(rateController.getCabinRating);

router
  .route("/:cabinId/rateCabin")
  .get(authMiddleware.authenticateToken, rateController.createRate)
  .post(authMiddleware.authenticateToken, rateController.createRate);

module.exports = router;
