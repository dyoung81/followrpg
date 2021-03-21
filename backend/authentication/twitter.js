const mongoose = require("mongoose");
const User = mongoose.model("User");
const TwitterStrategy = require("passport-twitter").Strategy;

module.exports = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CLIENT,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
  },
  function (_, _, profile, cb) {
    User.findOne({ twitterID: profile.id }, async (err, doc) => {
      if (err) {
        return cb(err, null);
      }

      if (!doc) {
        const newUser = new User({
          twitterID: profile.id,
          username: `9${profile.id}`,
          displayName: profile.username,
        });

        await newUser.save();
        cb(null, newUser);
      } else {
        cb(null, doc);
      }
    });
  }
);
