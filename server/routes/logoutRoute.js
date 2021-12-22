module.exports = function (app) {
  app.get("/logout", (req, res) => {
    if (req.session.destroy()) {
      res.send([{ loggedout: true }]);
    } else {
      res.send([{ loggedout: false }]);
    }
  });
};
