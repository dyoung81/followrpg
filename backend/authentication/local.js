const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
});
