module.exports = function (app, db, multer, path) {
  //! Use of Multer
  var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "./public/materials/"); // './public/materials/' directory name where save the file
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

  app.post("/material/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      res.status(400);
      res.send("No File Uploaded");
    } else {
      const imgsrc = "http://localhost:3001/materials/" + req.file.filename;
      const sqlInsert =
        "INSERT INTO material values (?,?,?,(select date_format(now(),'%Y-%m-%d %T')))";
      db.query(
        sqlInsert,
        [req.body.classId, req.body.fileName, imgsrc],
        (err, result) => {
          if (err) {
            res.status(500);
            res.send("Internal server Error. File not uploaded.");
          }
          if (result) {
            res.send("File uploaded");
          } else {
            res.status(500);
            res.send("Internal server Error. File not uploaded.");
          }
        }
      );
    }
  });

  app.get("/material", (req, res) => {
    const sqlFetch =
      "select name,location,dateAndTime from material where classId=? order by dateAndTime DESC";
    db.query(sqlFetch, [req.query.classId], (err, result) => {
      if (err) {
        res.status(500);
        res.send("Internal server Error.");
      }
      if (result) {
        res.send(result);
      } else {
        res.status(500);
        res.send("Internal server Error.");
      }
    });
  });
};
