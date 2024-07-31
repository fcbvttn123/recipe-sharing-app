import {
  alpha,
  InputBase,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { useState } from "react"

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

export function SearchField({ placeholder, data, handleClick, filterLogic }) {
  const classes = useStyles()
  const [filteredData, setFilteredData] = useState([])
  function handleChange(e) {
    let inputValue = e.target.value
    if (inputValue == "") {
      setFilteredData([])
      return
    }
    if (data?.length > 0) {
      let filteredArray = data.filter((e) => filterLogic(e, inputValue))
      setFilteredData(filteredArray)
    }
  }
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
      {filteredData.length > 0 && (
        <List
          component="nav"
          style={{ position: "absolute" }}
          className="top-full bg-gray-400 w-full z-10"
        >
          {filteredData?.length > 0 &&
            filteredData.map((e, i) => (
              <ListItem
                key={i}
                button
                onClick={(e) => {
                  handleClick(e)
                  setFilteredData([])
                }}
              >
                <ListItemText primary={e.email || e} />
              </ListItem>
            ))}
        </List>
      )}
    </div>
  )
}
