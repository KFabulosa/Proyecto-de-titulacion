const meetingCtrl = {}
const { createNewMeetingWithUser } = require("../services/Meeting.service");

meetingCtrl.createNewMeeting = (req, res) => {
  createNewMeetingWithUser(req.body);
}

module.exports = meetingCtrl;