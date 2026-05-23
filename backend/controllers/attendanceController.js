const pool = require("../config/db");

exports.addAttendance = async (req, res) => {

  try {

    const { qrData } = req.body;

    const nis =
      qrData.replace("ABSEN-", "");

    const studentResult =
      await pool.query(
        `SELECT * FROM students
         WHERE nis = $1`,
        [nis]
      );

    if (
      studentResult.rows.length === 0
    ) {

      return res.status(404).json({
        success: false,
        message: "Siswa tidak ditemukan"
      });

    }

    const student =
      studentResult.rows[0];

    await pool.query(
      `INSERT INTO attendance
      (student_id, status)
      VALUES ($1, $2)`,
      [student.id, "Hadir"]
    );

    res.json({
      success: true,
      message: "Absensi berhasil",
      student
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal absensi"
    });

  }

};

exports.getAttendanceHistory =
async (req, res) => {

  try {

    const result = await pool.query(

    `SELECT

        attendance.id,

        students.nis,

        students.name,

        students.class,

        attendance.attendance_time,

        attendance.status

    FROM attendance

    JOIN students
    ON attendance.student_id =
    students.id

    ORDER BY attendance_time DESC`

    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
      "Gagal mengambil history"
    });

  }

};

//hapus 1 history
exports.deleteAttendance =
async (req, res) => {

  try {

    const id = req.params.id;

    await pool.query(
      `DELETE FROM attendance
       WHERE id = $1`,
      [id]
    );

    res.json({
      success: true,
      message:
        "History berhasil dihapus"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Gagal hapus history"
    });

  }

};

//hapus semua history
exports.clearAttendance =
async (req, res) => {

  try {

    await pool.query(
      `DELETE FROM attendance`
    );

    res.json({
      success: true,
      message:
        "Semua history berhasil dihapus"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Gagal clear history"
    });

  }

};