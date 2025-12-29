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
      const express = require("express");
      const mysql = require("mysql2");
      const cors = require("cors");
      const crypto = require("crypto");

      const app = express();
      app.use(cors());
      app.use(express.json());

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

      // ================ Inisialisasi tabel untuk admin history (jika belum ada) ================
      const createAdminHistoryTable = `
      CREATE TABLE IF NOT EXISTS tb_admin_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT,
        item_type VARCHAR(50),
        item_id INT,
        action VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;

      db.query(createAdminHistoryTable, (err) => {
        if (err) console.error('Gagal buat tb_admin_history:', err);
      });

      // Simple in-memory session store (token -> { adminId, expires })
      const sessions = {};

      function generateToken() {
        return crypto.randomBytes(24).toString('hex');
      }

      function authMiddleware(req, res, next) {
        const auth = req.headers['authorization'];
        if (!auth) return res.status(401).json({ error: 'Missing authorization token' });
        const parts = auth.split(' ');
        const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : auth;
        const session = sessions[token];
        if (!session) return res.status(401).json({ error: 'Invalid or expired token' });
        if (session.expires < Date.now()) {
          delete sessions[token];
          return res.status(401).json({ error: 'Token expired' });
        }
        // attach admin id to request
        req.adminId = session.adminId;
        next();
      }

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
          sql = "SELECT * FROM tb_info WHERE title LIKE ?";
        }

        db.query(sql, [`%${q}%`], (err, results) => {
          if (err) {
            console.error("Error query:", err);
            return res.status(500).json({ error: "Gagal ambil data search" });
          }
          res.json(results);
        });
      });

      // ================= Admin: login, insert, history, stats, profile =================
      // POST /admin/login  { username, password }
      app.post('/admin/login', (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'username & password required' });

        const sql = 'SELECT id, username, name, email, password FROM tb_admin WHERE username = ? LIMIT 1';
        db.query(sql, [username], (err, results) => {
          if (err) {
            console.error('Error ambil admin:', err);
            return res.status(500).json({ error: 'Gagal ambil data admin' });
          }
          if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

          const admin = results[0];
          // NOTE: password comparison is plaintext to keep simple — consider hashing in production
          if (admin.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

          const token = generateToken();
          sessions[token] = { adminId: admin.id, expires: Date.now() + 1000 * 60 * 60 }; // 1 jam

          res.json({ token, admin: { id: admin.id, username: admin.username, name: admin.name, email: admin.email } });
        });
      });

      // POST /admin/insert  { type: 'infografis'|'dokumentasi'|'info', payload: {...} }
      app.post('/admin/insert', authMiddleware, (req, res) => {
        const { type, payload } = req.body;
        if (!type || !payload) return res.status(400).json({ error: 'type and payload required' });

        let insertSql = '';
        let insertVals = [];

        if (type === 'infografis') {
          insertSql = 'INSERT INTO tb_infografis (title, description, date, image) VALUES (?, ?, ?, ?)';
          insertVals = [payload.title || null, payload.description || null, payload.date || new Date(), payload.image || null];
        } else if (type === 'dokumentasi') {
          insertSql = 'INSERT INTO tb_dokumentasi (title, description, date, file) VALUES (?, ?, ?, ?)';
          insertVals = [payload.title || null, payload.description || null, payload.date || new Date(), payload.file || null];
        } else if (type === 'info') {
          insertSql = 'INSERT INTO tb_info (title, content, date) VALUES (?, ?, ?)';
          insertVals = [payload.title || null, payload.content || null, payload.date || new Date()];
        } else {
          return res.status(400).json({ error: 'Unknown type' });
        }

        db.query(insertSql, insertVals, (err, result) => {
          if (err) {
            console.error('Error insert:', err);
            return res.status(500).json({ error: 'Gagal insert data' });
          }

          const itemId = result.insertId;
          const logSql = 'INSERT INTO tb_admin_history (admin_id, item_type, item_id, action) VALUES (?, ?, ?, ?)';
          db.query(logSql, [req.adminId, type, itemId, 'insert'], (logErr) => {
            if (logErr) console.error('Gagal log admin history:', logErr);
            // ignore logging error for response
            res.json({ success: true, itemId });
          });
        });
      });

      // GET /admin/history
      app.get('/admin/history', authMiddleware, (req, res) => {
        const limit = parseInt(req.query.limit || '50');
        const offset = parseInt(req.query.offset || '0');
        const sql = 'SELECT h.*, a.username as admin_username FROM tb_admin_history h LEFT JOIN tb_admin a ON a.id = h.admin_id ORDER BY h.created_at DESC LIMIT ? OFFSET ?';
        db.query(sql, [limit, offset], (err, results) => {
          if (err) {
            console.error('Error ambil history:', err);
            return res.status(500).json({ error: 'Gagal ambil history' });
          }
          res.json(results);
        });
      });

      // GET /admin/stats
      app.get('/admin/stats', authMiddleware, (req, res) => {
        const queries = {
          dokumentasi: 'SELECT COUNT(*) AS count FROM tb_dokumentasi',
          infografis: 'SELECT COUNT(*) AS count FROM tb_infografis',
          info: 'SELECT COUNT(*) AS count FROM tb_info',
          inputs: 'SELECT COUNT(*) AS count FROM tb_admin_history'
        };

        db.query(queries.dokumentasi, (e1, r1) => {
          if (e1) return res.status(500).json({ error: 'Gagal ambil stats' });
          db.query(queries.infografis, (e2, r2) => {
            if (e2) return res.status(500).json({ error: 'Gagal ambil stats' });
            db.query(queries.info, (e3, r3) => {
              if (e3) return res.status(500).json({ error: 'Gagal ambil stats' });
              db.query(queries.inputs, (e4, r4) => {
                if (e4) return res.status(500).json({ error: 'Gagal ambil stats' });
                res.json({
                  dokumentasi: r1[0].count,
                  infografis: r2[0].count,
                  info: r3[0].count,
                  totalInputs: r4[0].count
                });
              });
            });
          });
        });
      });

      // GET /admin/profile
      app.get('/admin/profile', authMiddleware, (req, res) => {
        const sql = 'SELECT id, username, name, email FROM tb_admin WHERE id = ? LIMIT 1';
        db.query(sql, [req.adminId], (err, results) => {
          if (err) return res.status(500).json({ error: 'Gagal ambil profile' });
          if (results.length === 0) return res.status(404).json({ error: 'Admin tidak ditemukan' });
          res.json(results[0]);
        });
      });

      // PUT /admin/profile  { name, email, password? }
      app.put('/admin/profile', authMiddleware, (req, res) => {
        const { name, email, password } = req.body;
        const parts = [];
        const vals = [];
        if (name !== undefined) { parts.push('name = ?'); vals.push(name); }
        if (email !== undefined) { parts.push('email = ?'); vals.push(email); }
        if (password !== undefined) { parts.push('password = ?'); vals.push(password); }
        if (parts.length === 0) return res.status(400).json({ error: 'Nothing to update' });
        const sql = `UPDATE tb_admin SET ${parts.join(', ')} WHERE id = ?`;
        vals.push(req.adminId);
        db.query(sql, vals, (err) => {
          if (err) return res.status(500).json({ error: 'Gagal update profile' });
          res.json({ success: true });
        });
      });

      // ================= Jalankan Server =================
      app.listen(3000, () => {
        console.log("Server berjalan di http://localhost:3000");
      });
