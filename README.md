# dbstweb
Situs dashboard statistik.

## Admin & Security

Tambahan endpoint admin dan enkripsi AES-128 untuk beberapa data sensitif.

Environment variable yang perlu diset:

- `ENCRYPTION_KEY` - kunci 16 byte untuk AES-128 (contoh: `0123456789abcdef`).

Tambahkan admin (contoh SQL):

```sql
CREATE TABLE IF NOT EXISTS tb_admin (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255),
	username_hash VARCHAR(128),
	password VARCHAR(512),
	name VARCHAR(255),
	email VARCHAR(255)
);

INSERT INTO tb_admin (username, username_hash, password, name, email)
VALUES (
	-- username encrypted with AES-128 or plain if you prefer
	'admin',
	SHA2('admin',256),
	-- password should be encrypted using the server's ENCRYPTION_KEY (or insert plaintext and update via profile API)
	'yourpassword',
	'Admin Utama',
	'admin@example.com'
);
```

Catatan:
- Sistem saat ini menggunakan AES-128-GCM untuk mengenkripsi kolom sensitif (`password`, `description`, `content`, `file`, `image`) dan menyimpan hash SHA-256 dari `username` di `username_hash` untuk lookup saat login.
- Untuk produksi: pertimbangkan menyimpan password menggunakan hashing yang aman (bcrypt) dan menyimpan `ENCRYPTION_KEY` di environment yang aman.

Menjalankan server:

```powershell
npm install express mysql2 cors
node js/server.js
```
