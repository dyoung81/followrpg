const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/User");
const router = require("./routes");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const LocalStrategy = passportLocal.Strategy;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongo loaded...");
  });

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

var sess = {
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: 60 * 60 * 24,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
};
if (process.env.NODE_ENV == "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

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

passport.use(
  new LocalStrategy((username, password, done) => {
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
  })
);

passport.use(
  new GoogleStrategy(
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
  )
);

passport.use(
  new FacebookStrategy(
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
  )
);

passport.use(
  new TwitterStrategy(
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
  )
);

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}!`);
});
