require("dotenv").config();
//make a .env file where all the enviroment variable are written
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userEmail",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 30,
    },
  })
);

//database credentials
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timezone: "+00:00",
});

//login requests
require("./routes/loginRoute.js")(app, db);

//logout request
require("./routes/logoutRoute.js")(app);

//home request
require("./routes/homeRoute.js")(app, db);

//class request
require("./routes/classRoute.js")(app, db);

//people request
require("./routes/peopleRoute.js")(app, db, nodemailer);

//material request
require("./routes/materialRoute.js")(app, db, multer, path);

//classwork request
require("./routes/classworkRoute.js")(app, db, multer, path);

//assignment request
require("./routes/assignmentRoute.js")(app, db, multer, path);

//grade request
require("./routes/gradeRoute.js")(app, db);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("running on port", PORT);
});
