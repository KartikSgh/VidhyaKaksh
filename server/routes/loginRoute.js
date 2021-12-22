module.exports = function (app) {
  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send([
        { loggedIn: true },
        { id: req.session.user[0] },
        { user: req.session.user[1] },
      ]);
    } else {
      console.log("yes");
      res.send([{ loggedIn: false }]);
    }
  });
};
