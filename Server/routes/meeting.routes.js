const jwt_decode = require("jwt-decode");

const { Router } = require("express");
const router = Router();

const { createNewMeeting, getAllMeetings } = require("../controllers/Meeting.controller");
const PaymentController = require("../controllers/Payment.controller");
const PaymentService = require("../services/Payment.service");
const { token } = require("morgan");

const PaymentInstance = new PaymentController(new PaymentService());
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
//proteger las rutas 
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


function verifyAdmin(req, res, next){
//leer token de req.token, se decodifica, pedirle a la base de datos el usurio con el email para leer el rol de usuario, que venga en el token codificado y se reisa si es admin si no lo es se manda un res.sendStatus (403)
  const token = req.token
  console.log(token)
  const decoded = jwt_decode(token);
  console.log(decoded)
  if(decoded.role == 'admin'){
    console.log('admin validado')
    next();
  }
else {
  // Forbidden
  res.sendStatus(403);
}
if(!decoded.role){
  res.sendStatus(403);
  console.log('no se encontro token')
}
else{
  console.log('se encontro token')
}
}


router.post("/meeting/add", createNewMeeting);
router.get("/meeting", verifyToken, verifyAdmin, getAllMeetings);

router.get("/meeting/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

module.exports = router;
