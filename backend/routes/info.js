import express from 'express';
import db from '../config/db.js';
import authAdmin from '../middleware/authAdmin.js';
import { encryptAES, decryptAES } from '../utils/aes.js';

const router = express.Router();

function safeDecrypt(value) {
  if (!value) return null;
  if (typeof value !== 'string') return value;
  const isHex = /^[0-9a-fA-F]+$/.test(value);
  if (!isHex || value.length < 32) return value;
  try {
    return decryptAES(value);
  } catch {
    return value;
  }
}

router.get('/', authAdmin, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tb_info');
    const data = rows.map(item => ({
      ...item,
      title: safeDecrypt(item.title),
      desk: safeDecrypt(item.desk),
      img: safeDecrypt(item.img)
    }));
    res.json(data);
  } catch (err) {
    console.error('ERROR GET INFO:', err);
    res.status(500).json({ message: 'Gagal mengambil data info' });
  }
});

router.post('/', authAdmin, async (req, res) => {
  try {
    const { title, desk, img, status } = req.body;
    await db.query(
      `INSERT INTO tb_info (title, desk, img, status, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [
        encryptAES(title),
        encryptAES(desk),
        img ? encryptAES(img) : null,
        status || 'draft',
        req.admin.id
      ]
    );
    res.json({ message: 'Info berhasil ditambahkan' });
  } catch (err) {
    console.error('ERROR POST INFO:', err);
    res.status(500).json({ message: 'Gagal menambah info' });
  }
});

router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { title, desk, img, status } = req.body;
    await db.query(
      `UPDATE tb_info
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
    res.json({ message: 'Info berhasil diupdate' });
  } catch (err) {
    console.error('ERROR PUT INFO:', err);
    res.status(500).json({ message: 'Gagal update info' });
  }
});

router.delete('/:id', authAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM tb_info WHERE id=?', [req.params.id]);
    res.json({ message: 'Info berhasil dihapus' });
  } catch (err) {
    console.error('ERROR DELETE INFO:', err);
    res.status(500).json({ message: 'Gagal hapus info' });
  }
});

export default router;
