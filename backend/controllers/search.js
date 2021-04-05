const mongoose = require("mongoose");
const ScheduledGame = mongoose.model("ScheduledGame");

exports.allGames = async (req, res) => {
  let games = await ScheduledGame.find(
    {},
    { "gm.displayName": 1, "gameDetails.title": 1 },
    (err, doc) => {
      if (err) throw err;
      return doc;
    }
  );
  res.send(games);
};
