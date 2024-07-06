const Recipe = require("../models/recipeModels")
const User = require("../models/userModels")
const validator = require("validator")

async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 })
    res.status(200).json(recipes)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function getYourRecipes(req, res) {
  const { email } = req.params
  try {
    if (!validator.isEmail(email)) {
      throw Error("Email not valid")
    }
    const yourRecipes = await Recipe.find({ email })
    if (yourRecipes.length == 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for this email" })
    }
    res.status(200).json(yourRecipes)
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
  const { title, ingredients, instruction, email } = req.body
  const image = req.file.filename
  try {
    const recipe = await Recipe.create({
      title,
      image,
      ingredients,
      instruction,
      email,
    })
    res.status(200).json(recipe)
  } catch (err) {
    res.status(400).json({ error: err.message })
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

async function updateRecipe(req, res) {
  try {
    const { title, ingredients, instruction, email } = req?.body
    const image = req?.file?.filename
    let updatedJson = { title, ingredients, instruction }
    if (image) {
      updatedJson.image = image
    }

    // Check authorized user
    let userIdSendingRequest = req.user._id.toString()
    let userInfoSendingRequest = await User.findOne({
      _id: userIdSendingRequest,
    })
    if (userInfoSendingRequest.email !== email) {
      res.status(400).json({ message: "Unauthorized User !" })
    }

    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      updatedJson,
      { new: true }
    )
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getRecipes,
  getYourRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
}
