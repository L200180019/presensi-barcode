require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Presensi Berjalan");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend hidup"
  });
});

module.exports = app;