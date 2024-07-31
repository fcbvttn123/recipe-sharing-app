import { useChannelStateContext, useChatContext } from "stream-chat-react"

export function CustomChannelHeader({ currentUserId }) {
  const { channel } = useChannelStateContext()
  const { openMobileNav } = useChatContext("ChannelHeader")
  let userIdCreatingChannel = channel.data.created_by.id
  let channelTitle =
    currentUserId == userIdCreatingChannel
      ? channel.data.anotherMember
      : channel.data.channelCreator
  let channelImage =
    currentUserId == userIdCreatingChannel
      ? channel.data.anotherMemberAvt
      : channel.data.channelCreatorAvt
  return (
    <div className="flex items-center justify-start gap-x-3 bg-white border-b-2 border-gray-300 px-6 py-2 rounded-tl-md rounded-tr-md">
      <button className="str-chat__header-hamburger" onClick={openMobileNav}>
        click
      </button>
      <img
        className="w-10 h-10 rounded-lg"
        src={channelImage}
        alt=""
        srcset=""
      />
      <div className="">
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}
