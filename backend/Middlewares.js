const User = require("./models/User");

exports.isAdministratorMiddleware = async function (req, res, next) {
  const { user } = req;
  if (user) {
    await User.findOne({ username: user.username }, (err, doc) => {
      if (err) throw err;
      if (doc?.isAdmin) {
        next();
      } else {
        res.send("Sorry, only admin's can perform this.");
      }
    });
  } else {
    res.send("Sorry, you arent logged in.");
  }
};
