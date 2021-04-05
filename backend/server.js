const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const fs = require("fs");
const join = require("path").join;
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

module.exports = app;
const PORT = process.env.PORT || 5000;

const models = join(__dirname, "./models");
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongo loaded...");
  });

require("./authentication/passport")(passport);
require("./express")(app, passport, mongoose);
require("./routes")(app, passport);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}!`);
});
