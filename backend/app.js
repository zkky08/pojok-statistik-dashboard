import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import infografisRoutes from './routes/infografis.js';
import infoRoutes from './routes/info.js';
import dokumentasiRoutes from './routes/dokumentasi.js';
import uploadRoutes from './routes/upload.js'; // ✅ TAMBAHAN

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  '/admin',
  express.static(path.join(__dirname, '../frontend/admin'))
);

app.use(cors({
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ TAMBAHAN (WAJIB)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend Pojok Statistik berjalan 🚀' });
});

app.use('/api/auth', authRoutes);

// ADMIN ROUTES (TIDAK DIUBAH)
app.use('/api/admin/infografis', infografisRoutes);
app.use('/api/admin/info', infoRoutes);
app.use('/api/admin/dokumentasi', dokumentasiRoutes);

// ✅ ROUTE UPLOAD (TAMBAHAN)
app.use('/api/admin/upload', uploadRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
