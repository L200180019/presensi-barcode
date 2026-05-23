const express = require("express");

const router = express.Router();

const {

  addAttendance,

  getAttendanceHistory, 
  deleteAttendance,
  clearAttendance

} = require(
  "../controllers/attendanceController"
);

router.post(
  "/scan",
  addAttendance
);

router.get(
  "/history",
  getAttendanceHistory
);

router.delete(
  "/history/:id",
  deleteAttendance
);

router.delete(
  "/history",
  clearAttendance
);

module.exports = router;