const meetingCtrl = {}
const { createNewMeetingWithUser, getAllMeetings2 } = require("../services/Meeting.service");

meetingCtrl.createNewMeeting = (req, res) => {
  console.log("holi")
  createNewMeetingWithUser(req.body);
}

meetingCtrl.getAllMeetings = async (req, res) => {
  const result = await getAllMeetings2();
  return res.send(result);
}

module.exports = meetingCtrl;