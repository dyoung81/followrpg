const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/User");
const router = require("./routes");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
  secret: "secretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 5,
  },
};
if (process.env.NODE_ENV == "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    console.log(doc);
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, doc);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (_, __, profile, cb) {
      User.findOne({ googleId: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }

        if (!doc) {
          const newUser = new User({
            googleId: profile.id,
            username: profile.name.givenName,
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
