const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(express.json());
app.set("port", process.env.PORT || 4000);

module.exports = app;

//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/meeting.routes"));