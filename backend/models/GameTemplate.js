const mongoose = require("mongoose");

const GameTemplate = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: true,
    type: String,
  },
  platforms: {
    type: [String],
  },
  players: {
    min: {
      type: Number,
      min: 0,
      max: 999,
    },
    max: {
      type: Number,
      min: 0,
      max: 999,
    },
  },
  gameSystem: {
    type: String,
  },
});

module.exports = mongoose.model("GameTemplate", GameTemplate);
