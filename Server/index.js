require("dotenv").config();

const app = require("./server");
require("./database");

app.get("/", (req, res) => {
  res.send('<h1>My Node App</h1>');
});

app.listen(app.get("port"), () => {
  console.log("Server on port:", app.get("port"));
});