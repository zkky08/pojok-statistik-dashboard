import crypto from "crypto";

const algorithm = "aes-128-cbc";
const key = Buffer.from(process.env.AES_KEY, "utf8"); // 16 byte
const iv  = Buffer.from(process.env.AES_IV, "utf8");  // 16 byte

// ==============================
// ENCRYPT → BASE64
// ==============================
export function encryptAES(plaintext) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted; // string base64
}

// ==============================
// DECRYPT ← BASE64
// ==============================
export function decryptAES(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
