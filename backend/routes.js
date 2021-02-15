const express = require("express");
const Message = require("./models/Message.js");
const router = express.Router();
const passport = require("passport");

// Get all messages example
router.get("/api/messages", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

router.post("api/messages", async (req, res) => {
  const message = new Message({
    name: req.body.name,
    content: req.body.content,
  });
  await message.save();
  res.send(message);
});

router.get("/", (req, res) => {
  res.send("Helllo WOlrd");
});
//Auth Routes

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
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

module.exports = router;
