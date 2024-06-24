const Recipe = require("../models/recipeModels")

async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 })
    res.status(200).json(recipes)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function getRecipe(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function createRecipe(req, res) {
  const { title, ingredients, instruction } = req.body
  const image = req.file.filename
  try {
    const recipe = await Recipe.create({
      title,
      image,
      ingredients,
      instruction,
    })
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id })
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
}
