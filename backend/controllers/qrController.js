const pool = require("../config/db");

const fs = require("fs");

const path = require("path");

const AdmZip = require("adm-zip");

exports.downloadQRByClass = async (req, res) => {

  try {

    const studentClass =
      req.params.studentClass;

    console.log(studentClass);

    const result = await pool.query(
      `SELECT * FROM students
       WHERE TRIM(class) = TRIM($1)`,
      [studentClass]
    );

    const students = result.rows;

    if (students.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Data siswa kosong"
      });

    }

    const zip = new AdmZip();

    students.forEach((student) => {

      const base64Data =
        student.qr_code.replace(
          /^data:image\/png;base64,/,
          ""
        );

      zip.addFile(
        `${student.name}.png`,
        Buffer.from(base64Data, "base64")
      );

    });

    const zipBuffer = zip.toBuffer();

    res.set(
      "Content-Type",
      "application/zip"
    );

    res.set(
      "Content-Disposition",
      `attachment; filename=${studentClass}.zip`
    );

    res.send(zipBuffer);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};