import 'dotenv/config';
import db from '../config/db.js';
import { encryptAES } from '../utils/aes.js';

const tables = ['tb_infografis', 'tb_info', 'tb_dokumentasi'];

function isEncrypted(val) {
  return typeof val === 'string' && /^[0-9a-fA-F]+$/.test(val) && val.length >= 32;
}

(async () => {
  for (const table of tables) {
    const [rows] = await db.query(`SELECT id, title, desk, img FROM ${table}`);

    for (const row of rows) {
      const updates = {};
      if (row.title && !isEncrypted(row.title)) updates.title = encryptAES(row.title);
      if (row.desk && !isEncrypted(row.desk)) updates.desk = encryptAES(row.desk);
      if (row.img && !isEncrypted(row.img)) updates.img = encryptAES(row.img);

      if (Object.keys(updates).length > 0) {
        await db.query(
          `UPDATE ${table} SET ? WHERE id=?`,
          [updates, row.id]
        );
        console.log(`Migrated ${table} ID ${row.id}`);
      }
    }
  }

  console.log('Migrasi AES selesai tanpa hapus data ✅');
  process.exit();
})();
