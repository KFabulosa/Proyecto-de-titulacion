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

async function getAllMeetings2() {
  try {
    const allMeetings = await Meeting.find({});
    console.log(allMeetings);
    return allMeetings;
  } catch (err) {
    console.log(err);
    console.log("Error getting all meetings");
  }
}

function notifyNewMeetingToUser(data) {
  sendMail(data.email, "test", {
    userName: data.completeName,
    taskName: "Tarea de prueba",
    meetingDate: data.day,
    meetingHour: data.hour,
    urlViewRequest: "https://nurgo-clinica.netlify.app",
    clientOrigin: "https://nurgo-clinica.netlify.app",
  });
}

module.exports = { createNewMeetingWithUser, notifyNewMeetingToUser, getAllMeetings2 };