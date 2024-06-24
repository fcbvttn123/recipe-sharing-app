const express = require("express")
const multer = require("multer")
const router = express.Router()
const multerConfig = require("../utils/multerConfig")

// Middleware
const upload = multer({ storage: multerConfig("../../front-end/src/images") })

// Routes
router.get("/", (req, res) => {
  res.json({ message: "GET recipes" })
})
router.get("/:id", (req, res) => {
  res.json({ message: `GET recipe: ${req.params.id}` })
})
router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file.filename)
  console.log(req.body)
  res.json({ message: "POST recipes" })
})
router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE recipe: ${req.params.id}` })
})
router.patch("/:id", (req, res) => {
  res.json({ message: `UPDATE recipe: ${req.params.id}` })
})

module.exports = router
