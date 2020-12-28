/**
 * app.js
 *
 * Entry point of boilermatch backend
 */

require("dotenv").config({path: "env"});

const express = require("express");
const apiRouter = require("./routes/api");
const db = require("./queries/queries");
const app = express();


/* Misc. */

app.use(express.urlencoded({ extended: false }));

/* Routing */

app.use(express.json());
// app.use("/", express.static("../frontend/boilermatch-frontend/build"));
app.use("/api", apiRouter);

// Send 404 to any unhandled routes
app.use(function (req, res) {
  res.sendStatus(404);
});

/* Start server */

app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT + "...")
);

module.exports = app;
