module.exports = function (app, db, nodemailer) {
  const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT, // true for 465, false for other ports
    host: process.env.EMAIL_HOST,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  app.post("/people/sendEmail", (req, res) => {
    console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
    const mailData = {
      from: process.env.EMAIL, // sender address
      to: req.body.to, // list of receivers
      subject: "Invitation to join class",
      text: `Your class code is - ${req.body.code}.`,
    };
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send(err);
      } else {
        res.send(info);
      }
    });
  });

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
