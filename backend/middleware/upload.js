import multer from "multer";
import path from "path";
import fs from "fs";

function makeStorage(folder) {
  const dir = `public/uploads/${folder}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
}

export const uploadInfografis = multer({
  storage: makeStorage("infografis")
});

export const uploadInfo = multer({
  storage: makeStorage("info")
});

export const uploadDokumentasi = multer({
  storage: makeStorage("dokumentasi")
});
