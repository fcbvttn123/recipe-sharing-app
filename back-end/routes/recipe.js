const express = require("express")
const router = express.Router()
const multer = require("multer")
const multerConfig = require("../utils/multerConfig")
const {
  getRecipes,
  getYourRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeControllers")
const authRequired = require("../middleware/authRequired")

// Middleware
const upload = multer({
  storage: multerConfig("../../front-end/public/images"),
})

// Recipe Routes
router.get("/", getRecipes)
router.get("/recipesOf/:email", getYourRecipes)
router.get("/:id", authRequired, getRecipe)
router.post("/", authRequired, upload.single("image"), createRecipe)
router.delete("/:id", authRequired, deleteRecipe)
router.patch("/:id", authRequired, upload.single("image"), updateRecipe)

module.exports = router
