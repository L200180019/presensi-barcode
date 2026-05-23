const express = require("express");

const router = express.Router();

const {
  exportAttendance
} = require(
  "../controllers/exportController"
);

router.get(
  "/export/:studentClass",
  exportAttendance
);

module.exports = router;
