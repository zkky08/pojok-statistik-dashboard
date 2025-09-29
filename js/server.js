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

// ================= Endpoint Confirm =================
app.get("/confirm", (req, res) => {
  const id = req.query.id; // ambil dari URL ?id=4
  const sql = "SELECT * FROM tb_infografis WHERE id = ? LIMIT 1";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error ambil data confirm:", err);
      return res.status(500).json({ error: "Gagal ambil data confirm" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }
    res.json(results[0]); // kirim hanya 1 objek
  });
});

// ================= Endpoint Search Suggestion =================
app.get("/search", (req, res) => {
  const type = req.query.type;
  const q = req.query.q;

  if (!q || q.length < 2) {
    return res.json([]); // biar ga bikin error
  }

  let sql = "";
  if (type === "dokumentasi") {
    sql = "SELECT * FROM tb_dokumentasi WHERE title LIKE ?";
  } else if (type === "infografis") {
    sql = "SELECT * FROM tb_infografis WHERE title LIKE ?";
  } else if (type === "berita") {
    sql = "SELECT * FROM tb_berita WHERE title LIKE ?";
  }

  db.query(sql, [`%${q}%`], (err, results) => {
    if (err) {
      console.error("Error query:", err);
      return res.status(500).json({ error: "Gagal ambil data search" });
    }
    res.json(results);
  });
});



// ================= Jalankan Server =================
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
