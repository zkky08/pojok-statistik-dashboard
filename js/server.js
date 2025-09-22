const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// Koneksi database
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

// API endpoint
app.get('/dokumentasi', (req, res) => {
  const sql = "SELECT * FROM tb_dokumentasi ORDER BY date ASC"; // ascending
  // kalau mau terbaru dulu: ORDER BY date DESC

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint ambil berita
app.get("/berita", (req, res) => {
  const sql = "SELECT * FROM berita ORDER BY date DESC"; // urutkan terbaru → lama
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error ambil berita:", err);
      return res.status(500).json({ error: "Gagal ambil data berita" });
    }
    res.json(results);
  });
});

// Jalankan server
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
