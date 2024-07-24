// React
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// MUI
import CssBaseline from "@material-ui/core/CssBaseline"
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import HomeIcon from "@material-ui/icons/Home"
import CreateIcon from "@material-ui/icons/Create"
import { useAuthContext } from "../hooks/useAuthContext"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { AUTH_ACTIONS } from "../main"
import ChatIcon from "@material-ui/icons/Chat"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  outlet: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 80,
      marginBottom: 20,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 260,
      marginTop: 85,
      marginBottom: 25,
    },
  },
}))

export function Layout(props) {
  // States
  const [links, setLinks] = useState([
    { icon: <HomeIcon />, text: "All Recipes", path: "/" },
    { icon: <CreateIcon />, text: "Post Your Recipe", path: "/postRecipe" },
    { icon: <AssignmentIndIcon />, text: "Your Recipes", path: "/yourRecipes" },
    { icon: <ChatIcon />, text: "Chat", path: "/chat" },
  ])
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, dispatch } = useAuthContext()
  const [allEmails, setAllEmails] = useState(null)
  const navigate = useNavigate()
  // MUI
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const container =
    window !== undefined ? () => window().document.body : undefined
  const drawer = (
    <div>
      <List>
        {user ? (
          // If user is signed in, the drawer shows logout button
          <ListItem
            button
            onClick={(e) => {
              localStorage.setItem("RECIPE-SHARING-APP-USER-TOKEN", null)
              dispatch({ type: AUTH_ACTIONS.LOGOUT })
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          // Else, the drawer shows login/sign-up buttons
          <div
            style={{ minHeight: "48px" }}
            className="flex items-center justify-center gap-x-8"
          >
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained">Sign Up</Button>
            </Link>
          </div>
        )}
      </List>
      <Divider />
      <List>
        {links.map((e, index) => (
          <Link to={e.path} key={index}>
            <ListItem button key={index}>
              <ListItemIcon>{e.icon}</ListItemIcon>
              <ListItemText primary={e.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {user && (
        <>
          <List>
            <ListItem button>
              {/* <ListItemText primary={`Current: ${user.email}`} /> */}
              <ListItemText primary={`${user.displayName}`} />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      {allEmails &&
        allEmails.map((e) => (
          <>
            <List>
              <ListItem button onClick={handleEmailClick}>
                <ListItemText primary={e.email} />
              </ListItem>
            </List>
            <Divider />
          </>
        ))}
    </div>
  )
  // Functions
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
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
      navigate("/chat")
    }
    createChannel(email, user.token)
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
  // UI
  return (
    <div>
      <CssBaseline />
      {/* App Bar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Recipe Sharing App
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Nav */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/* Content */}
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  )
}
