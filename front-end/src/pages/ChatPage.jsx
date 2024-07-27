import { useAuthContext } from "../hooks/useAuthContext"
import {
  Channel,
  ChannelHeader,
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
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { SearchField } from "../components/SearchField"

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
            sendChannelsToList
            filters={filters}
            sort={sort}
            options={options}
          />
          <Channel EmojiPicker={EmojiPicker}>
            <Window>
              <ChannelHeader />
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

function CustomListContainer({ children }) {
  return (
    <div className="w-72 flex flex-col gap-4 m-3 h-full relative">
      <SearchField placeholder="Email..." />
      {children}
      <Link to=".." relative="path" className="absolute bottom-2 w-full">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="w-full mb-4"
        >
          Back
        </Button>
      </Link>
    </div>
  )
}
