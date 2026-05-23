const pool = require("../config/db");

const { Parser } =
require("json2csv");

exports.exportAttendance =
async (req, res) => {

  try {

    const studentClass =
      req.params.studentClass;

    const result = await pool.query(

      `SELECT

        students.nis,
        students.name,
        students.class,
        attendance.attendance_time,
        attendance.status

      FROM attendance

      JOIN students
      ON attendance.student_id =
      students.id

      WHERE students.class = $1

      ORDER BY attendance_time DESC`,

      [studentClass]

    );

    const data = result.rows;

    if (data.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Data kosong"
      });

    }

    const json2csv =
      new Parser();

    const csv =
      json2csv.parse(data);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      `history-${studentClass}.csv`
    );

    return res.send(csv);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
      "Gagal export history"
    });

  }

};