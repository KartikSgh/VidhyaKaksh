module.exports = function (app, db) {
  app.get("/grade/assignments", (req, res) => {
    const sqlFetch = "select assignmentId,name from assignment where classId=?";
    db.query(sqlFetch, [req.query.classId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal Server Error");
      }
      if (result) {
        res.send(result);
      } else {
        res.status(500);
        res.send("Internal Server Error");
      }
    });
  });

  app.get("/grade/peoples", (req, res) => {
    const sqlFetch =
      "select email,assignmentId,marks from grade where classId=?";
    db.query(sqlFetch, [req.query.classId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal Server Error");
      }
      if (result) {
        res.send(result);
      } else {
        res.status(500);
        res.send("Internal Server Error");
      }
    });
  });

  app.post("/grade/updateMarks", (req, res) => {
    const sqlUpdate =
      "update grade set marks=? where email=? and classId=? and assignmentId=?";
    db.query(
      sqlUpdate,
      [req.body.marks, req.body.email, req.body.classId, req.body.assignmentId],
      (err, result) => {
        if (err) {
          res.status(500);
          res.send("Internal Server Error");
        }
        if (result) {
          res.send(result);
        } else {
          res.status(500);
          res.send("Internal Server Error");
        }
      }
    );
  });
};
