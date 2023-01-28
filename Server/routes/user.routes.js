const { Router } = require("express");
const router = Router();

const { registerUser, verifyUser, loginUser } = require("../controllers/User.controller");

router.post("/user/register", registerUser);
router.patch("/user/verify", verifyUser);
router.post("/user/login", loginUser);

module.exports = router;