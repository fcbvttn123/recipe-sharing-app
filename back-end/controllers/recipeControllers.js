const Recipe = require("../models/recipeModels")

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

module.exports = {
  createRecipe,
}
