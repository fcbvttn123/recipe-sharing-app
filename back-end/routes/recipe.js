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
const authRequired = require("../middleware/authRequired")

// Middleware
const upload = multer({ storage: multerConfig("../../front-end/src/images") })

// Recipe Routes
router.get("/", authRequired, getRecipes)
router.get("/:id", authRequired, getRecipe)
router.post("/", authRequired, upload.single("image"), createRecipe)
router.delete("/:id", authRequired, deleteRecipe)
router.patch("/:id", authRequired, updateRecipe)

module.exports = router
