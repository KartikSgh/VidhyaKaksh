module.exports = function (app, db, multer, path) {
  //! Use of Multer
  var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "./public/classwork/"); // './public/classwork/' directory name where save the file
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

  app.post("/classwork/create", upload.single("file"), (req, res) => {
    const sqlInsert =
      "insert into assignment (classId,name,message,fileLocation,fileName,duetime) values (?,?,?,?,?,?)";
    var imgsrc = null;
    if (req.file) {
      imgsrc = "http://localhost:3001/classwork/" + req.file.filename;
    }
    db.query(
      sqlInsert,
      [
        req.body.classId,
        req.body.name,
        req.body.message,
        imgsrc,
        req.body.fileName,
        req.body.duetime,
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
  });

  app.get("/classwork/assignments", (req, res) => {
    const sqlFetch =
      "select assignmentId,name,duetime from assignment where classId=? order by duetime desc";
    db.query(sqlFetch, [req.query.classId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal server Error");
      }
      if (result) {
        res.send(result);
      } else {
        res.status(500);
        res.send("Internal server Error");
      }
    });
  });
};
