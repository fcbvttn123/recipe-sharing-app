// React
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"

// MUI
import CssBaseline from "@material-ui/core/CssBaseline"
import {
  AppBar,
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
  toolbar: theme.mixins.toolbar,
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
  ])
  const [mobileOpen, setMobileOpen] = useState(false)
  // MUI
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const container =
    window !== undefined ? () => window().document.body : undefined
  const drawer = (
    <div>
      <div className={classes.toolbar} />
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
    </div>
  )
  // Functions
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
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
