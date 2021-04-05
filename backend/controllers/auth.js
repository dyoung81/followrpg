"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.logout = async function (req, res) {
  await req.logout();
  res.send("success");
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req?.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      displayName: username,
      password: hashedPassword,
    });
  } catch (err) {
    console.log(err.name);
    next(err);
  }
};
