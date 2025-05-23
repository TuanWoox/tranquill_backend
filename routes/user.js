const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");
router
  .route("/getInformation")
  .get(authMiddleware.authenticateToken, userController.getInformation);
router
  .route("/updateProfile")
  .put(authMiddleware.authenticateToken, userController.updateProfile);
router
  .route("/resetPassword")
  .post(
    userController.resetPassword
  );
router
  .route("/changePassword")
  .post(authMiddleware.authenticateToken, userController.changePassword);
module.exports = router;
