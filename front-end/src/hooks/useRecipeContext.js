import { useContext } from "react"
import { RecipeContext } from "../context/RecipeContext"

export function useRecipeContext() {
  const context = useContext(RecipeContext)
  return context
}
