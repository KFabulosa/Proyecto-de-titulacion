const express = require("express");
const app = express();

app.set("port", process.env.PORT || 4000);

module.exports = app;


//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/meeting.routes"));
// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });