const mongoose = require("mongoose");

const user = new mongoose.Schema({
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
    required: true,
    type: String,
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
});

module.exports = mongoose.model("User", user);
