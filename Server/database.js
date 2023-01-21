const mongoose = require("mongoose");

const PROJECT_APP_MONGODB_USER = process.env.PROJECT_APP_MONGODB_USER;
const PROJECT_APP_MONGODB_PASSWORD = process.env.PROJECT_APP_MONGODB_PASSWORD;
const PROJECT_APP_MONGODB_HOST = process.env.PROJECT_APP_MONGODB_HOST;
const PROJECT_APP_MONGODB_DATABASE = process.env.PROJECT_APP_MONGODB_DATABASE;
const MONGODB_URI=`mongodb+srv://${PROJECT_APP_MONGODB_USER}:${PROJECT_APP_MONGODB_PASSWORD}@${PROJECT_APP_MONGODB_HOST}/${PROJECT_APP_MONGODB_DATABASE}`;

console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
