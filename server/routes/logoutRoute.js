module.exports = function (app) {
  app.get("/logout", (req, res) => {
    if (req.session.destroy()) {
      res.send("Logged out");
    } else {
      res.status(500);
      res.send("Server Error");
    }
  });
};
