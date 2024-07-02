import { useParams } from "react-router-dom"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RecipeCard } from "../components/RecipeCard"

export function RecipeDetails() {
  const { recipes } = useRecipeContext()
  const { id } = useParams()
  let recipe = recipes ? recipes.find((e) => e._id == id) : null
  return (
    <div>
      {recipe && (
        <RecipeCard
          key={recipe._id}
          email={recipe.email}
          title={recipe.title}
          datePosted={recipe.createdAt}
          imgName={recipe.image}
          ingredients={recipe.ingredients}
          instructions={recipe.instruction}
        />
      )}
    </div>
  )
}