const express = require("express");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");
const { isAdministratorMiddleware } = require("./Middlewares");
const User = require("./models/User");
const GameTemplate = require("./models/GameTemplate");
const GMStatBlock = require("./models/GMStatBlock");
const bcrypt = require("bcrypt");

dotenv.config();

router.get("/", (req, res) => {
  res.send("Helllo WOlrd");
});

//User functions
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.send("success");
});

//Auth Routes
router.post("/auth/register", async (req, res) => {
  const { username, password } = req?.body;
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Improper Values");
    return;
  }
  User.findOne({ username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        displayName: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success");
    }
  });
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  res.send("success");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    //failureRedirect: "http://localhost:3000",
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  function (req, res) {
    //res.redirect("http://localhost:3000");
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    //failureRedirect: "http://localhost:3000",
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  function (req, res) {
    //res.redirect("http://localhost:3000");
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/auth/twitter", passport.authenticate("twitter"));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    //failureRedirect: "http://localhost:3000",
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  function (req, res) {
    //res.redirect("http://localhost:3000");
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/getuser", (req, res) => {
  res.send(req.user);
});

// admin functions

router.post(
  "/admin/deleteuser",
  isAdministratorMiddleware,
  async (req, res) => {
    const { id } = req?.body;
    await User.findByIdAndDelete(id, (err) => {
      if (err) throw err;
    });
    res.send("success");
  }
);

router.get(
  "/admin/getallusers",
  isAdministratorMiddleware,
  async (req, res) => {
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
  }
);

//game
router.post("/game/createtemplate", async (req, res) => {
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
});

router.post("/auth/register", async (req, res) => {
  const { username, password } = req?.body;
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Improper Values");
    return;
  }
  User.findOne({ username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        displayName: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success");
    }
  });
});

module.exports = router;
