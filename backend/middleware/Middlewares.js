"use strict";
const User = require("../models/User");

exports.isAdministratorMiddleware = async function (req, res, next) {
  try {
    const { user } = req;
    if (user) {
      await User.findOne({ username: user.username }, (err, doc) => {
        if (err) throw err;
        if (doc?.isAdmin) {
          next();
        } else {
          res.send("Sorry, only admin's can perform this.");
        }
      });
    } else {
      throw new Error("NotLoggedIn");
    }
  } catch (err) {
    next(err);
  }
};
