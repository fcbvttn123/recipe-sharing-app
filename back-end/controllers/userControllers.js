const jwt = require("jsonwebtoken")
const User = require("../models/userModels")
const StreamChat = require("stream-chat").StreamChat

function createStreamToken(_id) {
  const serverClient = new StreamChat(
    "d8t3tcvbutju",
    "4yz8prf2smx6tycskkyvus5jesnx2q7jxsvpex5y6jm6b58hv9z58sbuf3vj3n2v"
  )
  const token = serverClient.createToken(_id)
  return token
}

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

async function signupUser(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.signup(email, password)
    const token = createToken(user._id)
    const streamToken = createStreamToken(user.email)
    res.status(200).json({ email, token, streamToken })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    const streamToken = createStreamToken(user.email)
    res.status(200).json({ email, token, streamToken })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  signupUser,
  loginUser,
}
