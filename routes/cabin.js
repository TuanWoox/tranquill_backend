const express = require("express");
const router = express.Router({ mergeParams: true });
const upload = require("../config/multer");
const cabinController = require("../controller/cabin");
const authMiddleware = require("../middleware/authMiddleware");
router.route("/getAllCabins").get(cabinController.getAllCabins);
router
  .route("/deleteCabin")
  .delete(
    authMiddleware.authenticateToken,
    authMiddleware.isAdmin,
    cabinController.deleteCabin
  );
router
  .route("/createCabin")
  .post(
    authMiddleware.authenticateToken,
    authMiddleware.isAdmin,
    upload.single("image"),
    cabinController.createCabin
  );
router.route("/duplicateCabin").post(
  authMiddleware.authenticateToken,
  authMiddleware.isAdmin,

  cabinController.duplicateCabin
);

module.exports = router;
