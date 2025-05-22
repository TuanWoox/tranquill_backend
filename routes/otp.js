const express = require("express");
const router = express.Router({ mergeParams: true });
const otpController = require("../controller/otp");

router.route("/createOTP").post(otpController.createOTP);
router.route("/verifyOTP").get(otpController.verifyOTP);
module.exports = router;
