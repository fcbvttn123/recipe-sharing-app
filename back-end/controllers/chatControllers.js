const StreamChat = require("stream-chat").StreamChat
const serverClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)
const User = require("../models/userModels")

async function createMessagingChannel(req, res) {
  const { anotherUserEmail } = req.body
  let userIdSendingRequest = req.user._id.toString()
  let anotherUser = await User.findOne({
    email: anotherUserEmail,
  })
  try {
    const channel = serverClient.channel("messaging", {
      created_by_id: userIdSendingRequest,
      members: [userIdSendingRequest, anotherUser._id.toString()],
    })
    await channel.create()
    res.status(200).json({ message: "Channel created!" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createMessagingChannel,
}
