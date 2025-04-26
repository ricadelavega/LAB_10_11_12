const express = require("express");
const router = express.Router();
const multer = require("multer");

// Set up where and how to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename to avoid duplicates
  },
});

const upload = multer({ storage: storage });

// POST route for adding student
router.post("/", upload.single("image"), (req, res) => {
  const { name, course } = req.body;
  const imagePath = req.file ? req.file.path : null;

  console.log("Received:", { name, course, imagePath });

  // You can save this to DB here. For now, just return it:
  res.status(201).json({ message: "Student added", student: { name, course, imagePath } });
});

module.exports = router;
