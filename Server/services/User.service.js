const User = require("../models/User");
const VerificationCode = require("../models/VerificationCode");
const { sendMail } = require("../services/EmailSender");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jsonWebToken = require('jsonwebtoken');

async function createNewUser(data) {
  try {
    let user = await User.findOne({ email: data.email });
    if (user) {
      throw new Error("Usuario ya registrado");
    }
    let encryptedPass = await bcrypt.hash(data.password, saltRounds);
    console.log(encryptedPass);
    const userToCreate = new User({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: encryptedPass,
    });
    const response = await userToCreate.save();

    // Verification code
    let code = Math.floor(100000 + Math.random() * 900000);
    let userId = response._id.toString();
    const verificationCode = new VerificationCode({
      code: code,
      userId: userId,
    });
    await verificationCode.save();
    sendVerificationEmail({
      code,
      email: data.email,
      name: data.name,
      lastname: data.lastname,
    });
    // return {
    //   ...response._doc,
    // };
    return null;
  } catch (err) {
    return err.toString();
  }
}

function sendVerificationEmail(data) {
  sendMail(data.email, "verification", {
    userName: data.name + " " + data.lastname,
    code: data.code,
    urlViewRequest: "http://localhost:8080/verify.html",
    clientOrigin: "https://nurgo.com",
  });
}

async function verifyUserCode(data) {
  try{
    let user = await User.findOne({email: data.email});
    if (!user) {
      throw new Error("El correo no está registrado.");
    }
    const userId = user._id;
    const verificationCode = VerificationCode.findOne({ code: data.code, userId });
    if (!verificationCode) {
      throw new Error("El código es inválido.");
    }
    user.isVerified = true;
    await user.save();
  } catch (err) {
    return err.toString();
  }
  console.log(data);
  return null;
}

async function loginUser(data) {
  try {
    console.log("Hello");

    let user = await User.findOne({email: data.email, isVerified: true});
    console.log(user)

    if (!user) {
      console.log("no registrado")
      throw new Error("El correo no está registrado o no está verificado.");
    }
    console.log("antes del bcrypt")

    if (!bcrypt.compareSync(data.password, user.password)) {
      console.log("contra incorrecta");
      throw new Error("Contraseña incorrecta");
    }
    else {
      let payload = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
      console.log(payload);

      let options = {
        expiresIn: 3600,
      }
      console.log(options);

      let token = jsonWebToken.sign(payload, process.env.JWT_KEY, options);

      console.log(token);
      return token;
    }
  } catch (err) {
    console.log("Entro al error");
    return err.toString();
  }
}

module.exports = { createNewUser, verifyUserCode, loginUser };