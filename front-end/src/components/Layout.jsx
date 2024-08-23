// React
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"

// MUI
import {
  CssBaseline,
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
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import CreateIcon from "@mui/icons-material/Create"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ChatIcon from "@mui/icons-material/Chat"

import { useAuthContext } from "../hooks/useAuthContext"
import { AUTH_ACTIONS, RECIPE_ACTIONS } from "../main"
import { SearchField } from "./SearchField"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { makeStyles } from "@mui/styles"

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
  const { recipes, dispatch: recipeDispatch } = useRecipeContext()
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
              <ListItemText primary={`${user.displayName}`} />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
    </div>
  )
  // Functions
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  let allRecipeTitles = []
  recipes &&
    recipes.forEach((e) => {
      allRecipeTitles.push(e.title)
    })
  // UI
  return (
    <div>
      <CssBaseline />
      {/* App Bar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="flex items-center justify-start sm:justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className="hidden sm:block">
            Recipe Sharing App
          </Typography>
          <SearchField
            placeholder="Recipe name..."
            data={allRecipeTitles.length > 0 && allRecipeTitles}
            handleClick={(itemNameClicked, filteredData) => {
              let newArr = []
              recipes.forEach(
                (e) => itemNameClicked === e.title && newArr.push(e)
              )
              recipeDispatch({
                type: RECIPE_ACTIONS.GET_FILTERED_RECIPES,
                payload: newArr,
              })
            }}
          />
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
