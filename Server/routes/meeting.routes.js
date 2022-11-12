const { Router } = require("express");
const router = Router();

const { createNewMeeting, getAllMeetings } = require("../controllers/Meeting.controller");

// router.get("/meeting/add" );
router.post("/meeting/add", createNewMeeting);
router.get("/meeting", getAllMeetings);

module.exports = router;
