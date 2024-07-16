import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core"
import {
  Chat,
  Channel,
  useCreateChatClient,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react"

const drawerWidth = 280
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

export function ChatPage() {
  const { user } = useAuthContext()
  const [emails, setEmails] = useState(null)
  const classes = useStyles()
  const drawer = (
    <div>
      <List></List>
      <Divider />
      {emails &&
        emails.map((e, i) => (
          <div key={i}>
            <List>
              <ListItem button onClick={handleClick} data-email={e.email}>
                <ListItemText primary={e.email} />
              </ListItem>
            </List>
            <Divider />
          </div>
        ))}
    </div>
  )
  const client =
    user &&
    useCreateChatClient({
      apiKey: import.meta.env.VITE__STREAM_API_KEY,
      tokenOrProvider: user.streamToken,
      userData: { id: user.id },
    })
  const [channel, setChannel] = useState(null)

  async function handleClick(e) {
    const res = await fetch("/api/chat/createMessagingChannel", {
      method: "POST",
      body: JSON.stringify({ anotherUserEmail: e.target.textContent }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await res.json()
    const channel = client.channel("messaging", json.channelId)
    setChannel(channel)
  }

  useEffect(() => {
    async function getAllEmails(token) {
      let res = await fetch("/api/auth/getAllEmails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      let json = await res.json()
      setEmails(json)
    }
    user?.token && getAllEmails(user.token)
  }, [])

  return (
    <div>
      {channel && client ? (
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      ) : (
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      )}
    </div>
  )
}
