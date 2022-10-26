//Se llama meeting para no confundir date (cita) con el tipo de dato date (fecha)
const { Schema, model } = require("mongoose");

const MeetingSchema = new Schema({
  hour: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = model("Meeting", MeetingSchema);
