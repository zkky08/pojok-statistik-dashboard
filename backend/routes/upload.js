import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  uploadInfografis,
  uploadInfo,
  uploadDokumentasi
} from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/infografis",
  authAdmin,
  uploadInfografis.single("file"),
  (req, res) => {
    res.json({
      path: `/uploads/infografis/${req.file.filename}`
    });
  }
);

router.post(
  "/info",
  authAdmin,
  uploadInfo.single("file"),
  (req, res) => {
    res.json({
      path: `/uploads/info/${req.file.filename}`
    });
  }
);

router.post(
  "/dokumentasi",
  authAdmin,
  uploadDokumentasi.single("file"),
  (req, res) => {
    res.json({
      path: `/uploads/dokumentasi/${req.file.filename}`
    });
  }
);

export default router;
