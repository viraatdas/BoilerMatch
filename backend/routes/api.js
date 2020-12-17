/**
 * api.js
 *
 * Handles routing for all API routes/endpoints
 */

const express = require("express");
const userApi = require("./user");
const router = express.Router();

// Develop routes here
router.use("/user", userApi);

module.exports = router;
