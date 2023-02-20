const Meeting = require("../models/Meeting");
const User = require("../models/User");

const { sendMail } = require("../services/EmailSender");

async function createMeeting(data) {
  try {
    let user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    const newMeeting = new Meeting({
      day: data.day,
      hour: data.hour.toString(),
      email: data.email,
      user: user._id,
    });

    const response = await newMeeting.save();
    user.meetings.push(newMeeting._id);
    console.log(user);
    await user.save();
    let dataToEmail = {
      userName: user.name + " " + user.lastname,
      meetingDate: data.day,
      meetingHour: data.hour.toString(),
    }
    notifyNewMeetingToUser(dataToEmail);
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
    // const allMeetings = await Meeting.find({});
    const allMeetings = await Meeting.aggregate([{
      $lookup: { 
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "usr"
      }
    }]);
    console.log(allMeetings)
    // console.log(allMeetings);
    return allMeetings;
  } catch (err) {
    console.log(err);
    console.log("Error getting all meetings");
  }
}

function notifyNewMeetingToUser(data) {
  sendMail(data.email, "test", {
    userName: data.userName,
    meetingDate: data.meetingDate,
    meetingHour: data.meetingHour,
    urlViewRequest: "https://nurgo-clinica.netlify.app",
    clientOrigin: "https://nurgo-clinica.netlify.app",
  });
}

module.exports = { createMeeting, notifyNewMeetingToUser, getAllMeetings2 };