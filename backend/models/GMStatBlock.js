const mongoose = require("mongoose");

const GMStatBlock = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    displayName: {
      type: String,
    },
    scheduledGames: [mongoose.Types.ObjectId],
    gameTemplates: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GMStatBlock", GMStatBlock);
