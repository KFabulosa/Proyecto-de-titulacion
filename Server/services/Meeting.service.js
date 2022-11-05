const Meeting = require("../models/Meeting");
const { sendMail } = require("../services/EmailSender");

async function createNewMeetingWithUser(data) {
  const newMeeting = new Meeting({
    day: data.day,
    hour: data.hour.toString(),
    completeName: data.completeName,
    email: data.email,
  });
  try {
    const response = await newMeeting.save();
    notifyNewMeetingToUser(data);
    return {
      ...response._doc,
    }
  } catch(err) {
    console.log(err);
    console.log("Error saving meeting.");
  }
}

function notifyNewMeetingToUser(data) {
  sendMail(data.email, "test", {
    userName: data.completeName,
    taskName: "Tarea de prueba",
    meetingDate: data.day,
    meetingHour: data.hour,
    urlViewRequest: "http://localhost:8080",
    clientOrigin: "https://nurgo.com",
  });
}

module.exports = { createNewMeetingWithUser, notifyNewMeetingToUser };