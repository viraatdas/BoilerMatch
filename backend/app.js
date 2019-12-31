require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

const apiRouter = require("./routes/api");
const app = express();

// MongoDB connection

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

// Passport config ----------------------------------------------------------------

app.use(passport.initialize());
require("./config/passport.js")(passport);

// Misc.

// app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//---------------------------------------------------------------------------------

// Routing

app.use(express.json());
app.use("/", express.static("./frontend/the-socratic-circle/build"));
app.use("/api", apiRouter);
// Handle any other requests (could change to specify /login and /register)
// For now there is only a single point of entry - index.html
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/frontend/the-socratic-circle/build/index.html")
  );
});

// Catch 404 and forward to error handler ------------------------------------------
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

//---------------------------------------------------------------------------------

app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT + "...")
);

module.exports = app;
