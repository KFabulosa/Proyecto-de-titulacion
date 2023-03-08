const meetingCtrl = {}
const { createMeeting, getAllMeetings2 } = require("../services/Meeting.service");

meetingCtrl.createNewMeeting = (req, res) => {
  createMeeting(req.body);
}

meetingCtrl.getAllMeetings = async (req, res) => {
  const result = await getAllMeetings2();
  console.log(req.token)
  return res.send(result);
}

module.exports = meetingCtrl;