import {
  alpha,
  InputBase,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.55),
    },
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

export function SearchField({ placeholder }) {
  const classes = useStyles()
  const { user } = useAuthContext()
  const [allEmails, setAllEmails] = useState(null)
  const [filteredEmails, setFilteredEmails] = useState([])
  function handleChange(e) {
    let inputValue = e.target.value
    if (inputValue == "") {
      setFilteredEmails([])
      return
    }
    if (allEmails?.length > 0) {
      let filteredArray = allEmails.filter((e) => {
        if (e.email.includes(inputValue)) {
          return e.email
        }
      })
      setFilteredEmails(filteredArray)
    }
  }
  function handleEmailClick(e) {
    const email = e.target.textContent
    async function createChannel(email, token) {
      let res = await fetch("/api/chat/createMessagingChannel", {
        method: "POST",
        body: JSON.stringify({ anotherUserEmail: email }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      let json = await res.json()
    }
    createChannel(email, user.token)
    setFilteredEmails([])
  }
  useEffect(() => {
    async function getAllEmails(token) {
      let res = await fetch("/api/auth/getAllEmails", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      let json = await res.json()
      setAllEmails(json)
    }
    user && getAllEmails(user.token)
  }, [user])
  return (
    <div className="relative">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </div>
      {filteredEmails.length > 0 && (
        <List
          component="nav"
          style={{ position: "absolute" }}
          className="top-full bg-gray-400 w-full z-10"
        >
          {filteredEmails?.length > 0 &&
            filteredEmails.map((e, i) => (
              <ListItem key={i} button onClick={handleEmailClick}>
                <ListItemText primary={e.email} />
              </ListItem>
            ))}
        </List>
      )}
    </div>
  )
}
