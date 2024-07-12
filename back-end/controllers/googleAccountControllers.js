const GoogleAccount = require("../models/googleAccountModels")
const User = require("../models/userModels")

async function checkIfAccountExists(req, res) {
  try {
    const { email } = req.body
    const exist = await GoogleAccount.findOne({ email })
    const existInUser = await User.findOne({ email })
    if (exist) {
      return res.json({
        message:
          "this google account is already registered before, start login",
      })
    } else if (!exist && !existInUser) {
      await GoogleAccount.create({ email })
      return res.json({
        message:
          "this email is added to Google_Account table, start sign-up process for Users table",
      })
    } else if (!exist && existInUser) {
      return res.json({
        message: "Email already in use!",
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  checkIfAccountExists,
}
