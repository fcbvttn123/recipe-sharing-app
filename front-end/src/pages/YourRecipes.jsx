import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { RecipeCard } from "../components/RecipeCard"
import { CircularProgress } from "@material-ui/core"

export function YourRecipes() {
  /* 
    States
  */
  const { user } = useAuthContext()
  const [recipes, setRecipes] = useState(null)

  /* 
    This code is used to render content conditionally 
  */
  let content = null
  if (recipes?.message == "No recipes found for this email") {
    // If user does not have any recipes, render text to screen
    console.log(recipes)
    content = <p>No recipes found for this email</p>
    // If user has recipes, render recipe cards
  } else if (recipes?.length > 0) {
    console.log(recipes)
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
    console.log(recipes)
    content = <CircularProgress />
  }

  /* 
    This useEffect() function is used to fetch recipes from one user
  */
  useEffect(() => {
    async function getYourRecipes(token) {
      try {
        let res = await fetch("/api/recipe/yourRecipes", {
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
  }, [])

  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {content}
    </div>
  )
}
