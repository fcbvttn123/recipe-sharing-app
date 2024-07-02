import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { useState } from "react"
import { Avatar } from "./Avatar"
import { formatDistanceToNow } from "date-fns"
import DeleteIcon from "@material-ui/icons/Delete"
import { useAuthContext } from "../hooks/useAuthContext"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RECIPE_ACTIONS } from "../main"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}))

export function RecipeCard({
  id,
  email,
  title,
  datePosted,
  imgName,
  ingredients,
  instructions,
}) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const { user } = useAuthContext()
  const { recipes, dispatch } = useRecipeContext()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  function handleDeleteEvent(e) {
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
        }
      } catch (err) {
        console.error(err)
      }
    }
    startDeleteProcess(id)
  }
  return (
    <Card className={classes.root}>
      {/* Card Header */}
      <CardHeader
        avatar={<Avatar>{email[0].toUpperCase()}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={formatDistanceToNow(datePosted, { addSuffix: true })}
      />
      {/* Card Image */}
      <CardMedia className={classes.media} image={`./images/${imgName}`} />
      {/* Card Content */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {ingredients}
        </Typography>
      </CardContent>
      {/* Card Actions */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {user?.email == email && (
          <IconButton aria-label="share" onClick={handleDeleteEvent}>
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      {/* Card Expanded */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{instructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
