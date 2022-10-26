const { Router } = require("express");
const router = Router();

const { createNewMeeting } = require("../controllers/Meeting.controller");

// router.get("/meeting/add" );
router.post("/meeting/add", createNewMeeting);

module.exports = router;
