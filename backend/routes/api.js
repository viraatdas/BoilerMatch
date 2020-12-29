/**
 * api.js
 *
 * Handles routing for all API routes/endpoints
 */

 /* DB query functions */
const db = require("../db/queries")
const express = require("express");
const userApi = require("./user");
const router = express.Router();

// Develop routes here
router.use("/user", userApi);

module.exports = router;
