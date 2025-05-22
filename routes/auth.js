const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controller/auth");
router.route("/logIn").post(authController.logIn);
router.route("/signUp").post(authController.signUp);
router.route("/validateJWT").get(authController.validateJWT);
router.route("/identityVerification").post(authController.identityVerification);
module.exports = router;
