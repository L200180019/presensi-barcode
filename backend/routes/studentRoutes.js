const express = require("express");

const router = express.Router();

const {
  addStudent,
  getStudents,
  deleteStudent
} = require("../controllers/studentController");

router.post(
  "/students/add",
  addStudent
);

router.get(
  "/students",
  getStudents
);

router.delete(
  "/students/:id",
  deleteStudent
);

module.exports = router;