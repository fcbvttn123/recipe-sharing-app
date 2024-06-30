import { useEffect } from "react"
import { RecipeCard } from "../components/RecipeCard"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RECIPE_ACTIONS } from "../main"

export function Home() {
  const { recipes, dispatch } = useRecipeContext()
  useEffect(() => {
    async function getRecipes() {
      let res = await fetch("/api/recipe")
      let json = await res.json()
      dispatch({ type: RECIPE_ACTIONS.GET_RECIPES, payload: json })
    }
    getRecipes()
  }, [])
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {recipes &&
        recipes.map((e, i) => (
          <RecipeCard
            key={i}
            email={e.email}
            title={e.title}
            datePosted={e.createdAt}
            imgName={e.image}
            ingredients={e.ingredients}
            instructions={e.instruction}
          />
        ))}
    </div>
  )
}
