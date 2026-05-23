const pool = require("../config/db");
const QRCode = require("qrcode");

exports.addStudent = async (req, res) => {

  try {

    const { nis, name, student_class } = req.body;

    console.log(req.body);

    const qrData = `ABSEN-${nis}`;

    const qrCode = await QRCode.toDataURL(qrData);

    const result = await pool.query(
      `INSERT INTO students
      (nis, name, class, qr_code)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [nis, name, student_class, qrCode]
    );

    res.json({
      success: true,
      student: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message
    });
  }
};

exports.getStudents = async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM students ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete card
exports.deleteStudent = async (req, res) => {

  try {

    const id = req.params.id;

    await pool.query(
      `DELETE FROM students
       WHERE id = $1`,
      [id]
    );

    res.json({
      success: true,
      message: "Siswa berhasil dihapus"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal hapus siswa"
    });

  }

};