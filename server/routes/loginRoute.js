const bcrypt = require("bcryptjs");

module.exports = function (app, db) {
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const password_hash = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO users(email,username, password) VALUES (?,?,?)",
      [email, username, password_hash],
      (err, result) => {
        if (err) {
          res.status(500);
          res.send("Internal Server Error");
        } else if (result) {
          req.session.userEmail = email;
          res.send(result);
        } else {
          res.status(500);
          res.send("Internal Server Error");
        }
      }
    );
  });

  app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * from users where email=?", [email], (err, result) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else if (result) {
        if (result.length === 0) {
          res.status(400);
          res.send("user not exist");
        } else {
          const pwd = result[0].password;
          // const password_hash = bcrypt.hashSync(password,10);
          const check = bcrypt.compareSync(password, pwd);
          if (check) {
            req.session.userEmail = email;
            res.send("credentials correct");
          } else {
            res.status(400);
            res.send("Password wrong");
          }
        }
      } else {
        res.status(400);
        res.send("wrong password or username!");
      }
    });
  });

  app.get("/login", (req, res) => {
    if (req.session.userEmail) {
      res.send({ userEmail: req.session.userEmail });
    } else {
      res.status(400);
      res.send("no user");
    }
  });
};
