import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from "stream-chat-react"
import "stream-chat-react/dist/css/index.css"

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
          <ChannelList filters={filters} sort={sort} options={options} />
          <Channel>
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
