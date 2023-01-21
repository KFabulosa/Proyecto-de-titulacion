const userCtrl = {};
const { createNewUser, verifyUserCode, loginUser } = require("../services/User.service");

userCtrl.registerUser = async (req, res) => {
  const result = await createNewUser(req.body);
  if (result) {
    return res.status(400).send(result);
  }
  return res.sendStatus(200);
};

userCtrl.verifyUser = async (req, res) => {
  const result = await verifyUserCode(req.body);
  console.log(result);
  if (result) {
    return res.status(400).send(result);
  }
  return res.sendStatus(200);
}

userCtrl.loginUser = async (req, res) => {
  const result = await loginUser(req.body);
  console.log("Esto es el result del servicio:", result);
  let isError = result.split(/\s+/).slice(0, 1)[0] === "Error:";
  if (isError) {
    return res.status(400).send(result);
  }
  res.send(result);
}

module.exports = userCtrl;