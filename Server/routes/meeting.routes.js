const { Router } = require("express");
const router = Router();

const { createNewMeeting, getAllMeetings } = require("../controllers/Meeting.controller");
const PaymentController = require("../controllers/Payment.controller");
const PaymentService = require("../services/Payment.service");

const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/meeting/add" );
router.post("/meeting/add", createNewMeeting);
router.get("/meeting", getAllMeetings);

router.get("/meeting/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

module.exports = router;
