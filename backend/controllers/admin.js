const User = require("../models/User");
const { wrap: async } = require("co");

exports.deleteuser = async(function* (req, res) {
  const { id } = req?.body;
  User.findByIdAndDelete(id, (err) => {
    if (err) throw err;
  });
  res.send("success");
});

exports.getallusers = async(function* (req, res) {
  User.find({}, (err, data) => {
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
});
