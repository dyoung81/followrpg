const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = function (app, passport, mongoose) {
  app.use(helmet());
  app.use(
    compression({
      threshold: 512,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(morgan("tiny"));
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
};
