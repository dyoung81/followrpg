const User = require("./models/User");

const isAdministratorMiddleware = (req, res, next) => {
  const { user } = req;
  if (user) {
    User.findOne({ username: user.username }, (err, doc) => {
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

module.exports = { isAdministratorMiddleware };
