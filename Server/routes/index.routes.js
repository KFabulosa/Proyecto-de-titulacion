const { Router } = require("express");
const router = Router();

const { renderIndex } = require("../controllers/Index.controller");

router.get("/", renderIndex);

module.exports = router;
