const express = require("express");
const router = express.Router({ mergeParams: true });
const cabinController = require("../controller/cabin");
router.route("/getAllCabins").get(cabinController.getAllCabins);

module.exports = router;
