import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { decryptAES } from '../utils/aes.js';

export default function authAdmin(req, res, next) {
  try {
    const encryptedToken = req.cookies.token;

    if (!encryptedToken) {
      return res.status(401).json({ message: 'Belum login' });
    }

    // Dekripsi token AES
    const token = decryptAES(encryptedToken);

    // Verifikasi JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cek role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    // Simpan info admin ke request
    req.admin = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token tidak valid' });
  }
}
