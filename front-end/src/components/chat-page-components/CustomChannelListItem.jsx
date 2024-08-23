import { useRef } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import clsx from "clsx"
import { Avatar } from "stream-chat-react"
import DeleteIcon from "@mui/icons-material/Delete"

export function CustomChannelListItem({
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
