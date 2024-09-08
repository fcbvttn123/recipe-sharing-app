import FavoriteIcon from "@mui/icons-material/Favorite"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import DeleteIcon from "@mui/icons-material/Delete"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material"

import { useState } from "react"
import { Avatar } from "./Avatar"
import { formatDistanceToNow } from "date-fns"
import { useAuthContext } from "../hooks/useAuthContext"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RECIPE_ACTIONS } from "../main"
import { Link, useNavigate } from "react-router-dom"

export function RecipeCard({
  id,
  email,
  title,
  datePosted,
  imgName,
  ingredients,
  instructions,
  likedBy,
  showDeleteIcon,
  showVerticalDotsIcon,
  likeNumber,
}) {
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useRecipeContext()
  const [liked, setLiked] = useState(user && likedBy.includes(user.email))
  const navigate = useNavigate()
  function handleDeleteEvent(e, idParam) {
    e.stopPropagation()
    e.preventDefault()
    async function startDeleteProcess(deletedId) {
      try {
        let res = await fetch(`/api/recipe/${deletedId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        let json = await res.json()
        if (res.ok) {
          dispatch({ type: RECIPE_ACTIONS.DELETE_RECIPE, payload: deletedId })
        } else {
          console.log(json)
        }
      } catch (err) {
        console.error(err)
      }
    }
    startDeleteProcess(idParam)
  }
  async function handleHeartIconClickEvent(e) {
    e.stopPropagation()
    e.preventDefault()
    if (!liked) {
      const res = await fetch(`/api/recipe/likeRecipe/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await res.json()
      dispatch({ type: RECIPE_ACTIONS.PATCH_RECIPE, payload: json })
    } else {
      const res = await fetch(`/api/recipe/unlikeRecipe/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await res.json()
      dispatch({ type: RECIPE_ACTIONS.PATCH_RECIPE, payload: json })
    }
    setLiked((prev) => !prev)
  }
  function handleEmailClick(e) {
    const email = e.target.textContent
    async function createChannel(email) {
      let res = await fetch("/api/chat/createMessagingChannel", {
        method: "POST",
        body: JSON.stringify({ anotherUserEmail: email }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      let json = await res.json()
      navigate("/chat")
    }
    createChannel(email)
  }
  let cardMenuItems = []
  // If user email is the same as card email, push edit menu items into the array
  user?.email == email &&
    cardMenuItems.push({ path: `/editRecipe/${id}`, text: "Edit" })
  return (
    <Card sx={{ width: 345 }}>
      {/* Card Header: Avatar, Title, Time, Vertical Dots */}
      <CardHeader
        avatar={<Avatar>{email[0].toUpperCase()}</Avatar>}
        action={
          <>
            {/* Only render the vertical dots if cardMenuItems array length > 0 */}
            {cardMenuItems.length > 0 && showVerticalDotsIcon && (
              <IconButton
                aria-label="settings"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setAnchorEl(e.currentTarget)
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {user?.email == email &&
                cardMenuItems.map((e) => (
                  <Link to={e.path}>
                    <MenuItem onClick={() => setAnchorEl(null)}>
                      {e.text}
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </>
        }
        title={title}
        subheader={formatDistanceToNow(datePosted, { addSuffix: true })}
      />
      {/* Card Image */}
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
        }}
        image={import.meta.env.VITE__IMAGE_URL + imgName}
      />
      {/* Card Content */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <span className="font-bold">Ingredients:</span>{" "}
          <pre className="whitespace-pre-wrap break-words">{ingredients}</pre>
        </Typography>
      </CardContent>
      {/* Card Actions: Heart Icon, Delete Icon, Expand Icon */}
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleHeartIconClickEvent}
        >
          <FavoriteIcon color={liked ? "secondary" : ""} />
        </IconButton>
        <p>{likeNumber}</p>
        {user?.email == email && showDeleteIcon && (
          <IconButton
            aria-label="share"
            onClick={(e) => handleDeleteEvent(e, id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          sx={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            marginLeft: "auto",
            transition: (theme) =>
              theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
          }}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setExpanded(!expanded)
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      {/* Card Expanded */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <pre className="whitespace-pre-wrap break-words">
              {instructions}
            </pre>
          </Typography>
          <p className="text-slate-400 mt-12 text-sm">
            created by <button onClick={handleEmailClick}>{email}</button>
          </p>
        </CardContent>
      </Collapse>
    </Card>
  )
}
