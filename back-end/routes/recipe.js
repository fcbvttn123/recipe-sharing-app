const express = require("express")
const multer = require("multer")
const router = express.Router()
const path = require("path")
const fs = require("fs")

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../images")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

// Middleware
const upload = multer({ storage: storage })

// Routes
router.get("/", (req, res) => {
  res.json({ message: "GET recipes" })
})
router.get("/:id", (req, res) => {
  res.json({ message: `GET recipe: ${req.params.id}` })
})
router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file.filename)
  console.log(req.body.title)
  res.json({ message: "POST recipes" })
})
router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE recipe: ${req.params.id}` })
})
router.patch("/:id", (req, res) => {
  res.json({ message: `UPDATE recipe: ${req.params.id}` })
})

module.exports = router
