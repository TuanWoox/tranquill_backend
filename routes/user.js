const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");
router
  .route("/getInformation")
  .get(authMiddleware.authenticateToken, userController.getInformation);

module.exports = router;
