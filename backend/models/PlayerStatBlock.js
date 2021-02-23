const mongoose = require("mongoose");

const PlayerStatBlock = new mongoose.Schema({
  username: {
    type: String,
  },
  displayName: {
    type: String,
  },
  scheduledGames: [mongoose.Types.ObjectId],
});

module.exports = mongoose.model("PlayerStatBlock", PlayerStatBlock);
