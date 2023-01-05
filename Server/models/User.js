const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  completeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  meetings: {
    type: Schema.Types.ObjectId,
    ref: "meetings",
  },
});

module.exports = model("User", userSchema);
