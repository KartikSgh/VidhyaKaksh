module.exports = function (app, db) {
  app.get("/class", (req, res) => {
    const sqlFetch = "select name,subject from classes where classId=?";
    db.query(sqlFetch, [req.query.classId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal Server Error");
      }
      if (result) {
        if (result.length === 0) {
          res.status(400);
          res.send("No class with given Id Exists");
        } else {
          res.send(result[0]);
        }
      } else {
        res.status(500);
        res.send("Internal Server Error");
      }
    });
  });

  app.post("/class/postAnnouncement", (req, res) => {
    const sqlInsert =
      "insert into announcement values (?,?,?,(select date_format(now(),'%Y-%m-%d %T')))";
    db.query(
      sqlInsert,
      [req.body.classId, req.body.email, req.body.message],
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

  app.get("/class/announcements", (req, res) => {
    const sqlFetch =
      "select b.username,a.message,a.dateAndTime from announcement a join users b on a.email=b.email where a.classId=?";
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

  app.post("/class/postComment", (req, res) => {
    const sqlInsert =
      "insert into comments values (?,?,?,(select date_format(now(),'%Y-%m-%d %T')))";
    db.query(
      sqlInsert,
      [req.body.messageDate, req.body.email, req.body.message],
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

  app.get("/class/comments", (req, res) => {
    const sqlFetch =
      "select b.username,a.messageDate,a.message,a.dateAndTime from comments a join users b on a.email=b.email where a.messageDate in (select c.dateAndTime from announcement c where c.classId=?)";
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

  app.delete("/class/deletePost", (req, res) => {
    const sqlDelete = "delete from announcement where dateAndTime=?";
    db.query(sqlDelete, [req.body.time], (err, result) => {
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

  app.delete("/class/deleteComment", (req, res) => {
    const sqlDelete = "delete from comments where dateAndTime=?";
    db.query(sqlDelete, [req.body.time], (err, result) => {
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
};
