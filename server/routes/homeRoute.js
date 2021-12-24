module.exports = function (app, db) {
  app.post("/home/addClass", (req, res) => {
    const initialClassCode = 1000;
    const sqlFetch =
      "select classId,studentId,teacherId from classes order by classId desc limit 1";
    db.query(sqlFetch, (err, result) => {
      if (err) {
        res.status(500);
        res.send("Server Error");
      }
      if (result) {
        var nextClassCode = 0;
        var nextStudentId = 0;
        var nextTeacherId = 0;

        if (result.length === 0) {
          nextClassCode = initialClassCode;
          nextStudentId = initialClassCode + 2500;
          nextTeacherId = initialClassCode + 5000;
        } else {
          nextClassCode = result[0].classId + 1;
          nextStudentId = result[0].studentId + 1;
          nextTeacherId = result[0].teacherId + 1;
        }

        const sqlInsert = "insert into classes values (?,?,?,?,?,?)";
        db.query(
          sqlInsert,
          [
            nextClassCode,
            req.body.className,
            req.body.classSubject,
            req.body.bgImage,
            nextStudentId,
            nextTeacherId,
          ],
          (err1, result1) => {
            if (err1) {
              res.status(500);
              res.send("Server Error");
            }
            if (result1) {
              const sqlInsertPeople = "insert into people values (?,?,?)";
              db.query(
                sqlInsertPeople,
                [nextClassCode, req.body.email, 0],
                (err2, res2) => {
                  if (err2) {
                    res.status(500);
                    res.send("Server Error");
                  }
                  if (res2) {
                    res.send({ classCode: nextClassCode });
                  } else {
                    res.status(500);
                    res.send("Server Error");
                  }
                }
              );
            } else {
              res.status(500);
              res.send("Server Error");
            }
          }
        );
      } else {
        res.status(500);
        res.send("Server Error connecting DB");
      }
    });
  });

  app.get("/home", (req, res) => {
    const sqlFetch =
      "select classId,name,subject,bgImage from classes where classId in (select a.classId from people a where a.email=?)";
    db.query(sqlFetch, [req.query.email], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Server Error connecting DB");
      }
      if (result) {
        res.send(result);
      } else {
        res.status(500);
        res.send("Server Error connecting DB");
      }
    });
  });

  app.post("/home/joinClass", (req, res) => {
    const sqlFetch =
      "select classId,name,subject,bgImage,teacherId from classes where studentId=? or teacherId=?";
    db.query(
      sqlFetch,
      [req.body.classCode, req.body.classCode],
      (err, result) => {
        if (err) {
          res.status(500);
          res.send("Server Error connecting DB");
        }
        if (result) {
          if (result.length === 0) {
            res.status(400);
            res.send("Class Code Incorrect");
          } else {
            const sqlFetchCheckUser =
              "select email from people where email=? and classId=?";
            db.query(
              sqlFetchCheckUser,
              [req.body.email, result[0].classId],
              (err1, result1) => {
                if (err1) {
                  res.status(500);
                  res.send("Server Error connecting DB");
                }
                if (result1) {
                  if (result1.length > 0) {
                    res.status(400);
                    res.send("User already enrolled in class");
                  } else {
                    const sqlInsert = "insert into people values (?,?,?)";
                    const role = 1; //default student
                    if (result[0].teacherId === req.body.classCode) {
                      role = 0;
                    }
                    db.query(
                      sqlInsert,
                      [result[0].classId, req.body.email, role],
                      (err2, result2) => {
                        if (err2) {
                          res.status(500);
                          res.send("Server Error connecting DB");
                        }
                        if (result2) {
                          res.send({
                            classId: result[0].classId,
                            name: result[0].name,
                            subject: result[0].subject,
                            bgImage: result[0].bgImage,
                          });
                        } else {
                          res.status(500);
                          res.send("Server Error connecting DB");
                        }
                      }
                    );
                  }
                } else {
                  res.status(500);
                  res.send("Server Error connecting DB");
                }
              }
            );
          }
        } else {
          res.status(500);
          res.send("Server Error connecting DB");
        }
      }
    );
  });

  app.post("/home/delete", (req, res) => {
    const sqlDelete = "delete from people where classId=? and email=?";
    db.query(sqlDelete, [req.body.classId, req.body.email], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Server Error connecting DB");
      }
      if (result) {
        res.send("Deleted!");
      } else {
        res.status(500);
        res.send("Server Error connecting DB");
      }
    });
  });
};
