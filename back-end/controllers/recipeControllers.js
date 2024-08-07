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
  try {
    let userData = await User.findOne({
      _id: req.user._id.toString(),
    })
    if (!validator.isEmail(userData.email)) {
      throw Error("Email not valid")
    }
    const yourRecipes = await Recipe.find({ email: userData.email })
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
  // Check authorized user
  let userIdSendingRequest = req.user._id.toString()
  let userInfoSendingRequest = await User.findOne({
    _id: userIdSendingRequest,
  })
  let recipeData = await Recipe.findById(req.params.id)
  if (userInfoSendingRequest.email !== recipeData.email) {
    return res.status(400).json({ message: "Unauthorized User !" })
  }

  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id })
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function updateRecipe(req, res) {
  try {
    const { title, ingredients, instruction } = req?.body
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
    let recipeData = await Recipe.findById(req.params.id)
    if (userInfoSendingRequest.email !== recipeData.email) {
      return res.status(400).json({ message: "Unauthorized User !" })
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

async function likeRecipe(req, res) {
  try {
    let userData = await User.findOne({
      _id: req.user._id.toString(),
    })
    let recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    let updatedRecipe = await recipe.like(userData.email)
    res.status(200).json(updatedRecipe)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

async function unlikeRecipe(req, res) {
  try {
    let userData = await User.findOne({
      _id: req.user._id.toString(),
    })
    let recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    let updatedRecipe = await recipe.unlike(userData.email)
    res.status(200).json(updatedRecipe)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

module.exports = {
  getRecipes,
  getYourRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  likeRecipe,
  unlikeRecipe,
}
