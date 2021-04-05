const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema(
  {
    googleID: {
      required: false,
      type: String,
    },
    twitterID: {
      required: false,
      type: String,
    },
    facebookID: {
      required: false,
      type: String,
    },
    username: {
      type: String,
      required: [true, "Enter a username."],
      unique: [true, "That username is taken"],
      validate: [
        validator.isAlphanumeric,
        "Usernames may only have letters and numbers",
      ],
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    displayName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user);
