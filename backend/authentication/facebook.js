const mongoose = require("mongoose");
const User = mongoose.model("User");
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ["id", "displayName", "name", "emails"],
  },
  function (_, _, profile, cb) {
    User.findOne({ facebookID: profile.id }, async (err, doc) => {
      if (err) {
        return cb(err, null);
      }

      if (!doc) {
        const newUser = new User({
          facebookID: profile.id,
          username: `8${profile.id}`,
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
