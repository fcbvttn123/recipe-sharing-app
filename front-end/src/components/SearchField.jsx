import { useState } from "react"
import { alpha, InputBase, List, ListItem, ListItemText } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { styled } from "@mui/material/styles"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

export function SearchField({ placeholder, data, handleClick }) {
  const [filteredData, setFilteredData] = useState([])
  const [searchFieldText, setSearchFieldText] = useState("")
  function handleChange(e) {
    let inputValue = e.target.value
    setSearchFieldText(inputValue)
    if (inputValue == "") {
      setFilteredData([])
      return
    }
    if (data?.length > 0) {
      let filteredArray = data.filter((e) =>
        e.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredData(filteredArray)
    }
  }
  function handleFormSubmit(e) {
    e.preventDefault()
    handleClick(searchFieldText, filteredData)
    setFilteredData([])
    setSearchFieldText("")
  }
  return (
    <div className="relative">
      <form
        sx={{
          position: "relative",
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.45),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.55),
          },
          marginLeft: 0,
          width: "100%",
        }}
        onSubmit={handleFormSubmit}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>
      </form>
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
                onClick={(event) => {
                  handleClick(e, filteredData)
                  setFilteredData([])
                  setSearchFieldText("")
                }}
              >
                <ListItemText primary={e} />
              </ListItem>
            ))}
        </List>
      )}
    </div>
  )
}
