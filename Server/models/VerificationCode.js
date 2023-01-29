const { Schema, model } = require("mongoose");

const verificationCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = model("VerificationCode", verificationCodeSchema);
