const express = require("express");
const router = express.Router();
const moodController = require("../controllers/moodController");

router.post("/check-in", moodController.checkInMood);
router.get("/history", moodController.getMoodHistory);
router.post("/chat", moodController.ventChat);

module.exports = router;
