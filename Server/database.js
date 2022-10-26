const mongoose = require("mongoose");

const PROJECT_APP_MONGODB_HOST = process.env.PROJECT_APP_MONGODB_HOST;
const PROJECT_APP_MONGODB_DATABASE = process.env.PROJECT_APP_MONGODB_DATABASE;
const MONGODB_URI=`mongodb://${PROJECT_APP_MONGODB_HOST}/${PROJECT_APP_MONGODB_DATABASE}`;


mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(db => console.log("Database is connected"))
  .catch(err => console.log(err));