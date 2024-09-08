// React
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"

// MUI
import {
  CssBaseline,
  AppBar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import CreateIcon from "@mui/icons-material/Create"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ChatIcon from "@mui/icons-material/Chat"
import { useMediaQuery, Drawer } from "@mui/material"
import { useTheme } from "@mui/system"

import { useAuthContext } from "../hooks/useAuthContext"
import { AUTH_ACTIONS, RECIPE_ACTIONS } from "../main"
import { SearchField } from "./SearchField"
import { useRecipeContext } from "../hooks/useRecipeContext"

const drawerWidth = 240

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
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"))
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
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: drawerWidth },
        }}
      >
        <Toolbar className="flex items-center justify-start sm:justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              marginRight: 2,
              display: { sm: "none" },
            }}
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
      <nav
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* Drawer for small screens (smDown) */}
        {!isMobile && (
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth, // Drawer width set via sx
              },
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        )}

        {/* Drawer for larger screens (smUp) */}
        {isMobile && (
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        )}
      </nav>
      {/* Content */}
      <div className="min-[600px]:ml-[250px] mt-[100px]">
        <Outlet />
      </div>
    </div>
  )
}
