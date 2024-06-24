const multer = require("multer")
const path = require("path")
const fs = require("fs")

function multerConfig(destPath) {
  // Multer configuration for file uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Ensure the directory exists
      const absolutePath = path.join(__dirname, destPath)
      if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath, { recursive: true })
      }
      // Save file
      cb(null, absolutePath)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
  })
  return storage
}

module.exports = multerConfig
