const mongoose = require("mongoose");
const User = mongoose.model("User");

const local = require("./local");
const google = require("./google");
const facebook = require("./facebook");
const twitter = require("./twitter");

module.exports = function (passport) {
  passport.serializeUser((id, done) => {
    return done(null, id._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      const userInformation = {
        username: user.username,
        isAdmin: user.isAdmin,
        displayName: user.displayName,
      };
      return done(null, userInformation);
    });
  });

  passport.use(local);
  passport.use(google);
  passport.use(facebook);
  passport.use(twitter);
};
