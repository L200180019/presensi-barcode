const express = require("express");

const router = express.Router();

const {
  downloadQRByClass
} = require("../controllers/qrController");

router.get(
  "/download-qr/:studentClass",
  downloadQRByClass
);

module.exports = router;