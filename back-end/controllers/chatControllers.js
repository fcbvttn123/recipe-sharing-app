const StreamChat = require("stream-chat").StreamChat
const serverClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)
const User = require("../models/userModels")

async function createMessagingChannel(req, res) {
  const { anotherUserEmail } = req.body
  try {
    let userIdSendingRequest = req.user._id.toString()
    let userSendingRequest = await User.findById(userIdSendingRequest)
    let anotherUser = await User.findOne({
      email: anotherUserEmail,
    })
    const channelId = `channel-${userIdSendingRequest}-${anotherUser._id.toString()}`
    const channel = serverClient.channel("messaging", channelId, {
      created_by_id: userIdSendingRequest,
      members: [userIdSendingRequest, anotherUser._id.toString()],
    })
    await channel.create()
    await channel.update({
      name: `Chat with ${userSendingRequest.displayName} and ${anotherUser.displayName}`,
      image: `https://ui-avatars.com/api/?name=${userSendingRequest.displayName[0] + anotherUser.displayName[0]}&background=random`,
      anotherMember: anotherUser.displayName,
    })
    res.status(200).json({ message: "Channel created!", channelId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createMessagingChannel,
}
