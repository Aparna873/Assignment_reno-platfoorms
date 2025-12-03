import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const imagesDir = path.join(process.cwd(), "schoolImages");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fname = Date.now() + "-" + Math.round(Math.random()*1e9) + ext;
    cb(null, fname);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(null, ok);
  },
});

app.use("/schoolImages", express.static(imagesDir));
app.post("/api/schools", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    if (!name || !address || !city || !state) {
      return res.status(400).json({ error: "Required fields missing." });
    }
    if (email_id && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_id)) {
      return res.status(400).json({ error: "Invalid email." });
    }
    const imageFilename = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      `INSERT INTO schools (name,address,city,state,contact,image,email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact || null, imageFilename, email_id || null]
    );

    const insertedId = result.insertId;
    res.json({ success: true, id: insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/api/schools", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, address, city, state, contact, image, email_id
       FROM schools ORDER BY created_at DESC`
    );
    const host = process.env.API_BASE_URL || `${req.protocol}://${req.get("host")}`;
    const data = rows.map(r => ({
      ...r,
      image_url: r.image ? `${host}/schoolImages/${r.image}` : null
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
