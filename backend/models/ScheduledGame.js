const mongoose = require("mongoose");
const GameTemplate = require("./GameTemplate");

const player = new mongoose.Schema({
  username: {
    type: String,
  },
  displayName: {
    type: String,
  },
});
const ScheduledGame = new mongoose.Schema({
  gameDetails: {
    type: GameTemplate.schema,
  },
  scheduling: {
    duration: {
      type: Number,
      required: true,
      min: 1,
      max: 47,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
    },
    days: {
      type: [String],
    },
  },
  gm: {
    username: {
      type: String,
    },
    displayName: {
      type: String,
    },
  },
  players: {
    type: [player],
  },
});

module.exports = mongoose.model("ScheduledGame", ScheduledGame);
