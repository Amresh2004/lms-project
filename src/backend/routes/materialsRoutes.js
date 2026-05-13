import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import Materials from "../models/Materials.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Upload folder
const uploadDir = path.join(__dirname, "../uploads/materials");

// create folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  },
});

// ✅ File filter (your logic kept)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "video/mp4",
    "video/x-msvideo",
    "video/x-matroska",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const allowedExtensions = [
    ".pdf", ".ppt", ".pptx", ".mp4", ".avi", ".mkv", ".txt", ".doc", ".docx",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) ||
    allowedExtensions.includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, PPT, DOC, TXT and video files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 },
});

// =============================
// 🚀 UPLOAD MATERIAL
// =============================
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      course,
      title,
      semester,
      subject,
      description,
      materialType,
      facultyEmail,
      videoUrl,
    } = req.body;

    if (!course || !semester || !subject || !title || !materialType || !facultyEmail) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 🎥 VIDEO LINK
    if (materialType === "Video Link") {
      if (!videoUrl) {
        return res.status(400).json({
          success: false,
          message: "Please enter a video URL",
        });
      }

      const saved = await Materials.create({
        course,
        semester,
        subject,
        title,
        description,
        materialType,
        facultyEmail,
        videoUrl,
        fileName: "",
        fileUrl: "",
      });

      return res.status(201).json({
        success: true,
        message: "Video link saved successfully",
        material: saved,
      });
    }

    // 📄 FILE UPLOAD
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const saved = await Materials.create({
      course,
      semester,
      subject,
      title,
      description,
      materialType,
      facultyEmail,
      fileName: req.file.filename,
      fileUrl: `/uploads/materials/${req.file.filename}`,
      videoUrl: videoUrl || "",
    });

    return res.status(201).json({
      success: true,
      message: "Material uploaded successfully",
      material: saved,
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during upload",
    });
  }
});

// =============================
// 📥 GET MATERIALS (FIXED 🔥)
// =============================



router.get("/", async (req, res) => {
  try {
    const materials = await Materials.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      materials: materials, // ✅ IMPORTANT FIX
    });

  } catch (error) {
    console.error("Fetch materials error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch materials",
    });
  }
});



// =============================
// ❌ DELETE MATERIAL
// =============================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid material id",
      });
    }

    const material = await Materials.findById(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    // delete file if exists
    if (material.fileName) {
      const filePath = path.join(uploadDir, material.fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Materials.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    });

  } catch (error) {
    console.error("Delete material error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting",
    });
  }
});

export default router;









