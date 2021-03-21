const mongoose = require("mongoose");
const GameTemplate = mongoose.model("GameTemplate");
const GMStatBlock = mongoose.model("GMStatBlock");
const ScheduledGame = mongoose.model("ScheduledGame");

exports.createTemplate = async function (req, res) {
  const {
    title,
    desc,
    platform,
    minPlayers,
    maxPlayers,
    gameSystem,
  } = req?.body;
  const { username, displayName } = req?.user;
  if (
    !title ||
    !desc ||
    typeof title !== "string" ||
    typeof desc !== "string"
  ) {
    res.send("Improper Values");
    return;
  }
  const newGameTemplate = new GameTemplate({
    title,
    desc,
    platforms: platform,
    players: {
      min: minPlayers,
      max: maxPlayers,
    },
    gameSystem,
  });
  await newGameTemplate.save(function (err, savedTemplate) {
    GMStatBlock.findOne({ username }, async (err, doc) => {
      if (err) throw err;
      if (!doc) {
        const newGM = new GMStatBlock({
          username: username,
          displayName: displayName,
          gameTemplates: [savedTemplate.id],
        });
        await newGM.save();
      }
      doc.gameTemplates.push(savedTemplate.id);
      await doc.save();
    });
  });
  res.send("success");
};

exports.createGame = async function (req, res) {
  const {
    title,
    desc,
    platform,
    minPlayers,
    maxPlayers,
    gameSystem,
    duration,
    recurring,
    date,
    days,
  } = req?.body;
  const { username, displayName } = req?.user;
  if (
    !title ||
    !desc ||
    typeof title !== "string" ||
    typeof desc !== "string"
  ) {
    res.send("Improper Values");
    return;
  }
  const newScheduledGame = new ScheduledGame({
    gameDetails: {
      title: title,
      desc: desc,
      platforms: platform,
      players: {
        min: minPlayers,
        max: maxPlayers,
      },
      gameSystem: gameSystem,
    },
    scheduling: {
      duration: duration,
      recurring: recurring,
      date: date,
      days: days,
    },
    gm: {
      username: username,
      displayName: displayName,
    },
    players: [],
  });
  await newScheduledGame.save(function (err, savedGame) {
    GMStatBlock.findOne({ username }, async (err, doc) => {
      if (err) throw err;
      if (!doc) {
        const newGM = new GMStatBlock({
          username: username,
          displayName: displayName,
          scheduledGames: [savedGame.id],
        });
        await newGM.save();
      }
      doc.scheduledGames.push(savedGame.id);
      await doc.save();
    });
  });
  res.send("success");
};

exports.gameTemplates = async function (req, res) {
  const { username } = req?.user;
  await GMStatBlock.findOne({ username }, async (err, doc) => {
    if (err) throw err;
    if (!doc) {
      res.send("No GM Profile");
    } else {
      await GameTemplate.find(
        { _id: { $in: doc.gameTemplates } },
        (errr, templates) => {
          if (errr) throw errr;
          if (!templates) {
            res.send("No templates");
          } else {
            res.send(templates);
          }
        }
      );
    }
  });
};

exports.gameDetails = async function (req, res) {
  const { gameid } = req?.query;
  await ScheduledGame.findOne({ _id: gameid }, (err, doc) => {
    if (err) throw err;
    if (doc) res.send(doc);
    else res.send("No such game");
  });
};
