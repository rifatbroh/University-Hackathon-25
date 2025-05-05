const express = require("express");
const router = express.Router();
const focusController = require("../controllers/focusController");

router.post("/record", focusController.recordSession);
router.get("/analytics", focusController.getAnalytics);

module.exports = router;
