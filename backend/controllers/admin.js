const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.deleteuser = async function (req, res) {
  const { id } = req?.body;
  await User.findByIdAndDelete(id, (err) => {
    if (err) throw err;
  });
  res.send("success");
};

exports.getallusers = async function (req, res) {
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
};
