const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { wrap: async } = require("co");

exports.logout = async(function* (req, res) {
  req.logout();
  res.send("success");
});

exports.register = async(function* (req, res) {
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
