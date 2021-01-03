/**
 * app.js
 *
 * Entry point of boilermatch backend
 */

require("dotenv").config({path: "env"});

const express = require("express");
const apiRouter = require("./routes/api");
const db = require("./db/queries");
const app = express();


/* Misc. */

// app.use(express.urlencoded({ extended: false }));

/* Routing */

app.use(express.json());
// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});
// app.use("/", express.static("../frontend/public/index.html"));
// app.use("/api", apiRouter);



// Send 404 to any unhandled routes
// app.use(function (req, res) {
//   res.sendStatus(404);
// });

/* Start server */

app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT + "...")
);

module.exports = app;
