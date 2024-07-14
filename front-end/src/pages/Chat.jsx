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

export function Chat() {
  const { user } = useAuthContext()
  const [emails, setEmails] = useState(null)
  const classes = useStyles()
  const drawer = (
    <div>
      <List></List>
      <Divider />
      {emails &&
        emails.map((e) => (
          <>
            <List>
              <ListItem button>
                <ListItemText primary={e.email} />
              </ListItem>
            </List>
            <Divider />
          </>
        ))}
    </div>
  )
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
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
    </div>
  )
}
