module.exports = function (app, db) {
  app.get("/people", (req, res) => {
    const sqlFetch =
      "select a.email,a.role,b.username from people a join users b on a.email=b.email where a.classId=?";
    db.query(sqlFetch, [req.query.classId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal Server Error");
      }
      if (result) {
        if (result.length === 0) {
          res.status(400);
          res.send("No class with given Id exists");
        } else {
          res.send(result);
        }
      } else {
        res.status(500);
        res.send("Internal Server Error");
      }
    });
  });
};
