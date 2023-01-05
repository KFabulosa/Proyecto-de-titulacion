//Se llama meeting para no confundir date (cita) con el tipo de dato date (fecha)
const { Schema, model } = require("mongoose");

const meetingSchema = new Schema({
  hour: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "users",
  // },
  completeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("Meeting", meetingSchema);
