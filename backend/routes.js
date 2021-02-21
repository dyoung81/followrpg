const express = require("express");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");
const { isAdministratorMiddleware } = require("./Middlewares");
const User = require("./models/User");

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

router.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
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

module.exports = router;
