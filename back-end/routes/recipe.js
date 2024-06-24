const express = require("express")
const router = express.Router()
const multer = require("multer")
const multerConfig = require("../utils/multerConfig")
const {
  createRecipe,
  getRecipes,
  getRecipe,
} = require("../controllers/recipeControllers")

// Middleware
const upload = multer({ storage: multerConfig("../../front-end/src/images") })

// Routes
router.get("/", getRecipes)
router.get("/:id", getRecipe)
router.post("/", upload.single("image"), createRecipe)
router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE recipe: ${req.params.id}` })
})
router.patch("/:id", (req, res) => {
  res.json({ message: `UPDATE recipe: ${req.params.id}` })
})

module.exports = router
