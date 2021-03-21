const mongoose = require("mongoose");
const ScheduledGame = mongoose.model("ScheduledGame");

exports.allGames = async function (req, res) {
  await ScheduledGame.find(
    {},
    { "gm.displayName": 1, "gameDetails.title": 1 },
    (err, doc) => {
      if (err) throw err;
      res.send(doc);
    }
  );
};
