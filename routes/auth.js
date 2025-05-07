const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controller/auth");
router.route("/logIn").post(authController.logIn);
router.route("/signUp").post(authController.signUp);
router.route("/validateJWT").get(authController.validateJWT);
module.exports = router;
