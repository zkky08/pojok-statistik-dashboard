import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/db.js";

import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

/* ================= AUTH ================= */
app.use("/api/auth", authRoutes);

/* ================= ADMIN ================= */
app.get("/api/admin", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, role, created_at FROM users"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [[user]] = await db.query(
      "SELECT role FROM users WHERE id=?",
      [id]
    );

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.role === "super") {
      return res.status(403).json({
        message: "Super admin tidak bisa dihapus"
      });
    }

    await db.query("DELETE FROM users WHERE id=?", [id]);
    res.json({ message: "Admin berhasil dihapus" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= INFOGRAFIS ================= */
app.get("/api/infografis", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, desk, img, date FROM tb_infografis ORDER BY date DESC"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/infografis", async (req, res) => {
  try {
    const { title, desk, img, date } = req.body;

    await db.query(
      "INSERT INTO tb_infografis (title, desk, img, date) VALUES (?,?,?,?)",
      [title, desk, img, date]
    );

    res.json({ message: "Infografis berhasil ditambahkan" });
  } catch {
    res.status(500).json({ message: "Gagal insert infografis" });
  }
});

app.delete("/api/infografis/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM tb_infografis WHERE id=?",
      [req.params.id]
    );
    res.json({ message: "Infografis berhasil dihapus" });
  } catch {
    res.status(500).json({ message: "Gagal hapus infografis" });
  }
});

/* ================= BERITA ================= */
app.get("/api/berita", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, desk, img, date FROM tb_info ORDER BY date DESC"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/berita", async (req, res) => {
  try {
    const { judul, desk, img, date } = req.body;

    await db.query(
      "INSERT INTO tb_info (title, desk, img, date) VALUES (?,?,?,?)",
      [judul, desk, img, date]
    );

    res.json({ message: "Berita berhasil ditambahkan" });
  } catch {
    res.status(500).json({ message: "Gagal insert berita" });
  }
});

app.delete("/api/berita/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM tb_info WHERE id=?",
      [req.params.id]
    );
    res.json({ message: "Berita berhasil dihapus" });
  } catch {
    res.status(500).json({ message: "Gagal hapus berita" });
  }
});

/* ================= DOKUMENTASI ================= */
app.get("/api/dokumentasi", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, desk, img, date FROM tb_dokumentasi ORDER BY date DESC"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/dokumentasi", async (req, res) => {
  try {
    const { title, desk, img, date } = req.body;

    await db.query(
      "INSERT INTO tb_dokumentasi (title, desk, img, date) VALUES (?,?,?,?)",
      [title, desk, img, date]
    );

    res.json({ message: "Dokumentasi berhasil ditambahkan" });
  } catch {
    res.status(500).json({ message: "Gagal insert dokumentasi" });
  }
});

app.delete("/api/dokumentasi/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM tb_dokumentasi WHERE id=?",
      [req.params.id]
    );
    res.json({ message: "Dokumentasi berhasil dihapus" });
  } catch {
    res.status(500).json({ message: "Gagal hapus dokumentasi" });
  }
});

/* ================= 404 JSON ================= */
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
