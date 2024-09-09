import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { RecipeCard } from "../components/RecipeCard"
import CircularProgress from "@mui/material/CircularProgress"
import { useRecipeContext } from "../hooks/useRecipeContext"

export function YourRecipes() {
  /* 
    States
  */
  const { user } = useAuthContext()
  const [recipes, setRecipes] = useState(null)
  const contextObject = useRecipeContext()

  /* 
    This code is used to render content conditionally 
  */
  let content = null
  // If user does not have any recipes, render text to screen
  if (recipes?.message == "No recipes found for this email") {
    content = <p>No recipes found for this email</p>
    // If user has recipes, render recipe cards
  } else if (recipes?.length > 0) {
    content = recipes.map((e) => (
      <RecipeCard
        key={e._id}
        id={e._id}
        email={e.email}
        title={e.title}
        datePosted={e.createdAt}
        imgName={e.image}
        ingredients={e.ingredients}
        instructions={e.instruction}
        likedBy={e.likedBy}
        likeNumber={e.likedBy.length}
        showDeleteIcon={true}
        showVerticalDotsIcon={true}
      />
    ))
    // If the fetch process is loading, render spinning animation
  } else {
    content = <CircularProgress />
  }

  /* 
    This useEffect() function is used to fetch recipes from one user
  */
  useEffect(() => {
    async function getYourRecipes(token) {
      try {
        let res = await fetch("http://localhost:3000/api/recipe/yourRecipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        let json = await res.json()
        setTimeout(() => {
          setRecipes(json)
        }, 500)
      } catch (err) {
        console.error(err)
      }
    }
    getYourRecipes(user.token)
  }, [contextObject.recipes])

  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {content}
    </div>
  )
}
