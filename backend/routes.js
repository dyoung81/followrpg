const express = require("express");
const Message = require("./models/Message");
const path = require("path");
const router = express.Router();

// Get all messages
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

//must be the final get route to direct all other gits to the build
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

module.exports = router;
