"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.deleteuser = async function (req, res) {
  const { id } = req?.body;
  await User.findByIdAndDelete(id, (err) => {
    if (err) throw err;
  });

  res.send("success");
};

exports.getallusers = async function (req, res) {
  try {
    await User.find({}, (err, data) => {
      if (err) throw err;
      const filteredUsers = [];
      data.forEach((item) => {
        const userInformation = {
          id: item._id,
          username: item.username,
          isAdmin: item.isAdmin,
        };
        filteredUsers.push(userInformation);
      });
      res.send(filteredUsers);
    });
  } catch (err) {
    return next(err);
  }
};
