/**
 * user.js
 *
 * Handles routing for all user API endpoints
 */

const db = require("../queries/queries");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User endpoint");
});

module.exports = router;
