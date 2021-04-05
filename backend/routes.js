const dotenv = require("dotenv");
const { isAdministratorMiddleware } = require("./middleware/Middlewares");
const auth = require("./controllers/auth");
const admin = require("./controllers/admin");
const game = require("./controllers/game");
const search = require("./controllers/search");

dotenv.config();

const fail = {
  failureRedirect: "/login",
};

module.exports = function (app, passport) {
  //User functions
  app.get("/auth/logout", auth.logout);
  app.post("/auth/register", auth.register);

  //Auth Routes
  app.post("/auth/login", passport.authenticate("local"), (req, res) => {
    res.send("success");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: process.env.CLIENT_URL,
      session: true,
    }),
    function (req, res) {
      res.redirect(process.env.CLIENT_URL);
    }
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: process.env.CLIENT_URL,
      session: true,
    }),
    function (req, res) {
      res.redirect(process.env.CLIENT_URL);
    }
  );

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: process.env.CLIENT_URL,
      session: true,
    }),
    function (req, res) {
      res.redirect(process.env.CLIENT_URL);
    }
  );

  app.get("/getuser", (req, res) => {
    res.send(req.user);
  });

  // admin functions
  app.post("/admin/deleteuser", isAdministratorMiddleware, admin.deleteuser);
  app.get("/admin/getallusers", isAdministratorMiddleware, admin.getallusers);

  //game
  app.post("/game/createtemplate", game.createTemplate);
  app.post("/game/creategame", game.createGame);
  app.get("/game/gametemplates", game.gameTemplates);
  app.get("/game/gamedetails", game.gameDetails);

  //search
  app.get("/search/allgames", isAdministratorMiddleware, search.allGames);

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    const payload = {
      url: req.originalUrl,
      error: "Not found",
    };
    if (req.accepts("json")) return res.status(404).json(payload);
    res.status(404).render("404", payload);
  });
};
