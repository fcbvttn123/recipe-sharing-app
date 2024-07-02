import { createContext, useEffect, useReducer } from "react"
import { RECIPE_ACTIONS } from "../main"

export const RecipeContext = createContext()

export function recipeReducer(state, action) {
  switch (action.type) {
    case RECIPE_ACTIONS.GET_RECIPES:
      return {
        recipes: action.payload,
      }
    case RECIPE_ACTIONS.POST_RECIPE:
      return {
        recipes: [action.payload, ...(state.recipes || [])],
      }
    case RECIPE_ACTIONS.DELETE_RECIPE:
      return {
        recipes: state.recipes.filter((e) => e._id !== action.payload),
      }
    default:
      return state
  }
}

export function RecipeContextProvider({ children }) {
  const [state, dispatch] = useReducer(recipeReducer, {
    recipes: null,
  })
  useEffect(() => {
    async function getRecipes() {
      let res = await fetch("/api/recipe")
      let json = await res.json()
      dispatch({ type: RECIPE_ACTIONS.GET_RECIPES, payload: json })
    }
    getRecipes()
  }, [])
  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  )
}
