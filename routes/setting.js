const express = require("express");
const router = express.Router({ mergeParams: true });
const settingController = require("../controller/setting");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");
router.route("/getSetting").get(settingController.getSetting);
router
  .route("/updateSetting")
  .post(authenticateToken, isAdmin, settingController.updateSetting);
module.exports = router;
