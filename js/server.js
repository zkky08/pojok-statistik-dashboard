const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// ================= Koneksi Database =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",     // ganti sesuai user database kamu
  password: "",     // password MySQL kamu
  database: "db_dbest" // ganti sesuai nama database kamu
});

// Cek koneksi
db.connect(err => {
  if (err) {
    console.error("Koneksi database gagal:", err);
    return;
  }
  console.log("Terhubung ke database MySQL ✅");
});

// ================= Endpoint Dokumentasi =================
app.get('/dokumentasi', (req, res) => {
  const sql = "SELECT * FROM tb_dokumentasi ORDER BY date ASC"; // ASC = lama → baru
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error ambil dokumentasi:", err);
      return res.status(500).json({ error: "Gagal ambil data dokumentasi" });
    }
    res.json(results);
  });
});

// ================= Endpoint Info =================
app.get("/info", (req, res) => {
  const sql = "SELECT * FROM tb_info ORDER BY date ASC"; // ASC = lama → baru
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error ambil info:", err);
      return res.status(500).json({ error: "Gagal ambil data info" });
    }
    res.json(results);
  });
});

// ================= Endpoint Infografis =================
app.get("/infografis", (req, res) => {
  const sql = "SELECT * FROM tb_infografis ORDER BY date ASC"; // ASC = lama → baru
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error ambil infografis:", err);
      return res.status(500).json({ error: "Gagal ambil data infografis" });
    }
    res.json(results);
  });
});

// ================= Jalankan Server =================
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
