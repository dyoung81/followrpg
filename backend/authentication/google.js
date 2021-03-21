const mongoose = require("mongoose");
const User = mongoose.model("User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  function (_, __, profile, cb) {
    User.findOne({ googleID: profile.id }, async (err, doc) => {
      if (err) {
        return cb(err, null);
      }
      if (!doc) {
        const newUser = new User({
          googleID: profile.id,
          username: `7${profile.id}`,
          displayName: profile.name.givenName,
        });
        await newUser.save();
        cb(null, newUser);
      } else {
        cb(null, doc);
      }
    });
  }
);
