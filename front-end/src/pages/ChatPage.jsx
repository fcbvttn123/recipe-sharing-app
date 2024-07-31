import { useAuthContext } from "../hooks/useAuthContext"
import {
  Avatar,
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useChannelStateContext,
  useChatContext,
  useCreateChatClient,
  Window,
} from "stream-chat-react"
import { EmojiPicker } from "stream-chat-react/emojis"
import "stream-chat-react/dist/css/index.css"
import DeleteIcon from "@material-ui/icons/Delete"
import clsx from "clsx"
import { useRef } from "react"
import { CustomListContainer } from "../components/chat-page-components/CustomListContainer"

export function ChatPage() {
  const { user } = useAuthContext()
  const client = useCreateChatClient({
    apiKey: import.meta.env.VITE__STREAM_API_KEY,
    tokenOrProvider: user.streamToken,
    userData: { id: user.id },
  })
  // Channel List props
  const sort = { last_message_at: -1 }
  const options = {
    limit: 10,
  }
  const filters = user && {
    type: "messaging",
    members: { $in: [user.id] },
  }
  return (
    <>
      {client ? (
        <Chat client={client}>
          <ChannelList
            List={CustomListContainer}
            Preview={CustomListItem}
            sendChannelsToList
            filters={filters}
            sort={sort}
            options={options}
          />
          <Channel EmojiPicker={EmojiPicker}>
            <Window>
              <CustomChannelHeader currentUserId={user.id} />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

function CustomChannelHeader({ currentUserId, live }) {
  const { channel } = useChannelStateContext()
  let userIdCreatingChannel = channel.data.created_by.id
  let channelTitle =
    currentUserId == userIdCreatingChannel
      ? channel.data.anotherMember
      : channel.data.channelCreator
  let channelImage =
    currentUserId == userIdCreatingChannel
      ? channel.data.anotherMemberAvt
      : channel.data.channelCreatorAvt
  const { openMobileNav } = useChatContext("ChannelHeader")
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

function CustomListItem({
  active,
  unread,
  latestMessage,
  onSelect: customOnSelectChannel,
  setActiveChannel,
  channel,
  watchers,
}) {
  const { user } = useAuthContext()
  const channelPreviewButton = useRef(null)
  let channelTitle = null
  let channelImage = null
  if (user) {
    channelTitle =
      user.id == channel.data.created_by.id
        ? channel.data.anotherMember
        : channel.data.channelCreator
    channelImage =
      user.id == channel.data.created_by.id
        ? channel.data.anotherMemberAvt
        : channel.data.channelCreatorAvt
  }
  function onSelectChannel() {
    if (customOnSelectChannel) {
      customOnSelectChannel(e)
    } else if (setActiveChannel) {
      setActiveChannel(channel, watchers)
    }
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur()
    }
  }
  async function deleteChannel(e) {
    e.stopPropagation()
    e.preventDefault()
    await channel.delete()
  }
  return (
    <button
      className={`${clsx(
        `str-chat__channel-preview-messenger str-chat__channel-preview`,
        active && "str-chat__channel-preview-messenger--active",
        unread && unread >= 1 && "str-chat__channel-preview-messenger--unread"
      )} relative`}
      data-testid="channel-preview-button"
      onClick={onSelectChannel}
      ref={channelPreviewButton}
      role="option"
    >
      <div className="str-chat__channel-preview-messenger--left">
        {channelImage && (
          <Avatar
            className="str-chat__avatar--channel-preview"
            image={channelImage}
          />
        )}
      </div>
      <div className="str-chat__channel-preview-end">
        <div className="str-chat__channel-preview-end-first-row">
          <div className="str-chat__channel-preview-messenger--name">
            {channelTitle && <span>{channelTitle}</span>}
          </div>
        </div>
        <div className="str-chat__channel-preview-messenger--last-message">
          {latestMessage}
        </div>
        <DeleteIcon
          onClick={deleteChannel}
          className="absolute right-3 top-3"
        />
      </div>
    </button>
  )
}
