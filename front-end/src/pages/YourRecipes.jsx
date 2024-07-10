import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { RecipeCard } from "../components/RecipeCard"

export function YourRecipes() {
  const { user } = useAuthContext()
  const [recipes, setRecipes] = useState(null)
  useEffect(() => {
    async function getYourRecipes(token) {
      try {
        let res = await fetch("/api/recipe/yourRecipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        let json = await res.json()
        setRecipes(json)
      } catch (err) {
        console.error(err)
      }
    }
    getYourRecipes(user.token)
  }, [])
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {recipes &&
        recipes.map((e) => (
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
        ))}
    </div>
  )
}
