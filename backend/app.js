/**
 * app.js
 *
 * Entry point of boilermatch backend
 */

require("dotenv").config({path: "env"});

const express = require("express");
const apiRouter = require("./routes/api");
const db = require("./db/queries");
const cors = require('cors');
const app = express();

// app.use(express.urlencoded({ extended: false }));

/* Routing */
app.use(cors());
app.use(express.json());

// land page
app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});

// simple test
app.get("/test", (req, res) => {
  res.send({ message: "Test successful!" });
});
// app.use("/api", apiRouter);

// Send 404 to any unhandled routes
app.use(function (req, res) {
  res.sendStatus(404);
});

/* Start server */

app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT + "...")
);

module.exports = app;
