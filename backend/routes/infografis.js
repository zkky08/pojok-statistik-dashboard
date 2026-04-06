import express from 'express';
import db from '../config/db.js';
import authAdmin from '../middleware/authAdmin.js';
import { encryptAES, decryptAES } from '../utils/aes.js';

const router = express.Router();

/**
 * Helper: decrypt aman (support data lama & data AES)
 */
function safeDecrypt(value) {
  if (!value) return null;

  // kalau bukan string, kembalikan apa adanya
  if (typeof value !== 'string') return value;

  // cek apakah hex (indikasi data AES)
  const isHex = /^[0-9a-fA-F]+$/.test(value);

  // data lama (plaintext) → tampilkan langsung
  if (!isHex || value.length < 32) {
    return value;
  }

  // coba decrypt, kalau gagal anggap data lama
  try {
    return decryptAES(value);
  } catch (e) {
    return value;
  }
}

/**
 * GET semua infografis (ADMIN)
 */
router.get('/', authAdmin, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tb_infografis');

    const data = rows.map(item => ({
      ...item,
      title: safeDecrypt(item.title),
      desk: safeDecrypt(item.desk),
      img: safeDecrypt(item.img)
    }));

    res.json(data);
  } catch (err) {
    console.error('ERROR GET INFOGRAFIS:', err);
    res.status(500).json({ message: 'Gagal mengambil data infografis' });
  }
});

/**
 * POST tambah infografis (ADMIN)
 */
router.post('/', authAdmin, async (req, res) => {
  try {
    const { title, desk, img, status } = req.body;

    await db.query(
      `INSERT INTO tb_infografis
       (title, desk, img, status, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [
        encryptAES(title),
        encryptAES(desk),
        img ? encryptAES(img) : null,
        status || 'draft',
        req.admin.id
      ]
    );

    await db.query(
      `INSERT INTO admin_logs (table_name, action, admin_id)
       VALUES ('tb_infografis', 'INSERT', ?)`,
      [req.admin.id]
    );

    res.json({ message: 'Infografis berhasil ditambahkan' });
  } catch (err) {
    console.error('ERROR POST INFOGRAFIS:', err);
    res.status(500).json({ message: 'Gagal menambah infografis' });
  }
});

/**
 * PUT update infografis (ADMIN)
 */
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { title, desk, img, status } = req.body;

    await db.query(
      `UPDATE tb_infografis
       SET title=?, desk=?, img=?, status=?, updated_at=NOW()
       WHERE id=?`,
      [
        encryptAES(title),
        encryptAES(desk),
        img ? encryptAES(img) : null,
        status,
        req.params.id
      ]
    );

    await db.query(
      `INSERT INTO admin_logs (table_name, record_id, action, admin_id)
       VALUES ('tb_infografis', ?, 'UPDATE', ?)`,
      [req.params.id, req.admin.id]
    );

    res.json({ message: 'Infografis berhasil diupdate' });
  } catch (err) {
    console.error('ERROR PUT INFOGRAFIS:', err);
    res.status(500).json({ message: 'Gagal update infografis' });
  }
});

/**
 * DELETE infografis (ADMIN)
 */
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM tb_infografis WHERE id=?', [req.params.id]);

    await db.query(
      `INSERT INTO admin_logs (table_name, record_id, action, admin_id)
       VALUES ('tb_infografis', ?, 'DELETE', ?)`,
      [req.params.id, req.admin.id]
    );

    res.json({ message: 'Infografis berhasil dihapus' });
  } catch (err) {
    console.error('ERROR DELETE INFOGRAFIS:', err);
    res.status(500).json({ message: 'Gagal hapus infografis' });
  }
});

export default router;
