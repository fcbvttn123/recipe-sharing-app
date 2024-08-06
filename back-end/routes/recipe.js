const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const {
  getRecipes,
  getYourRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  likeRecipe,
  unlikeRecipe,
} = require("../controllers/recipeControllers")
const authRequired = require("../middleware/authRequired")

// Middleware: Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({ storage: storage })

// Recipe Routes
router.get("/", getRecipes)
router.get("/yourRecipes", authRequired, getYourRecipes)
router.get("/:id", authRequired, getRecipe)
router.post("/", authRequired, upload.single("image"), createRecipe)
router.delete("/:id", authRequired, deleteRecipe)
router.patch("/:id", authRequired, upload.single("image"), updateRecipe)
router.post("/likeRecipe/:id", authRequired, likeRecipe)
router.post("/unlikeRecipe/:id", authRequired, unlikeRecipe)

module.exports = router
