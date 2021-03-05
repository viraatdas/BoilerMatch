/**
 * app.js
 *
 * Entry point of boilermatch backend
 */

require("dotenv").config();

const express = require("express");
const apiRouter = require("./routes/auth");
const db = require("./db/queries");
const cors = require("cors");
const app = express();
const passport = require("passport");
const path = require("path");

let PORT = process.env.PORT || 3000;

/* Routing */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// passport middleware
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

// configure routes
require("./routes/index")(app);

/* Start server */

app.listen(PORT, () => console.log("Server started on port " + PORT + "..."));
