/**
 * app.js
 * 
 * Entry point of boilermatch backend
 */

require("dotenv").config();

const express = require("express");
const apiRouter = require("./routes/api");
const app = express();

/* Database connection */

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("connected to database"));

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

app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT + "...")
);

module.exports = app;