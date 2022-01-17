module.exports = function (app, db, multer, path) {
  //! Use of Multer
  var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "./public/submission/"); // './public/submission/' directory name where save the file
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  var upload = multer({
    storage: storage,
  });

  app.get("/assignment", (req, res) => {
    const sqlFetch =
      "select name,message,fileLocation,fileName,duetime from assignment where assignmentId=?";
    db.query(sqlFetch, [req.query.assignmentId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal server error");
      }
      if (result) {
        res.send(result);
      } else {
        res.status(500);
        res.send("Internal server error");
      }
    });
  });

  app.get("/assignment/submission", (req, res) => {
    const sqlFetch =
      "select submissionLocation,submissionName,submissionDateAndTime from grade where assignmentId=? and classId=? and email=?";
    db.query(
      sqlFetch,
      [req.query.assignmentId, req.query.classId, req.query.email],
      (err, result) => {
        if (err) {
          res.status(500);
          res.send("Internal server error");
        }
        if (result) {
          res.send(result);
        } else {
          res.status(500);
          res.send("Internal server error");
        }
      }
    );
  });

  app.post(
    "/assignment/createSubmission",
    upload.single("file"),
    (req, res) => {
      const sqlInsert =
        "insert into grade (classId,assignmentId,email,submissionLocation,submissionName,submissionDateAndTime,marks) values (?,?,?,?,?,(select date_format(now(),'%Y-%m-%d %T')),0)";
      var imgsrc = null;
      if (req.file) {
        imgsrc = "http://localhost:3001/submission/" + req.file.filename;
      }
      db.query(
        sqlInsert,
        [
          req.body.classId,
          req.body.assignmentId,
          req.body.email,
          imgsrc,
          req.body.fileName,
        ],
        (err, result) => {
          if (err) {
            res.status(500);
            res.send("Internal server Error");
          }
          if (result) {
            res.send("created");
          } else {
            res.status(500);
            res.send("Internal server Error");
          }
        }
      );
    }
  );
};
