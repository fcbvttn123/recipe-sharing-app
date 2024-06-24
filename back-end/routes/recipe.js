const express = require("express")
const router = express.Router()
const multer = require("multer")
const multerConfig = require("../utils/multerConfig")
const {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeControllers")

// Middleware
const upload = multer({ storage: multerConfig("../../front-end/src/images") })

// Routes
router.get("/", getRecipes)
router.get("/:id", getRecipe)
router.post("/", upload.single("image"), createRecipe)
router.delete("/:id", deleteRecipe)
router.patch("/:id", updateRecipe)

module.exports = router
