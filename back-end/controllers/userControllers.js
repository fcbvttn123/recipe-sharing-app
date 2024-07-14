const jwt = require("jsonwebtoken")
const User = require("../models/userModels")
const StreamChat = require("stream-chat").StreamChat

const serverClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)

function createStreamToken(_id) {
  return serverClient.createToken(_id)
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
    const syncingUserResponse = await serverClient.upsertUsers([
      {
        id: user._id,
        role: "admin",
        email: user.email,
      },
    ])
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
