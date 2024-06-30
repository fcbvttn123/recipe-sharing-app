import { createContext, useReducer } from "react"
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
        recipes: [action.payload, ...state.recipes],
      }
    default:
      return state
  }
}

export function RecipeContextProvider({ children }) {
  const [state, dispatch] = useReducer(recipeReducer, {
    recipes: null,
  })
  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  )
}
