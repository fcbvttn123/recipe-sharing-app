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
    case RECIPE_ACTIONS.PATCH_RECIPE:
      return {
        recipes: state.recipes.map((e) => {
          if (e._id == action.payload._id) {
            return {
              ...action.payload,
            }
          } else {
            return e
          }
        }),
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
      if (res.ok) {
        dispatch({ type: RECIPE_ACTIONS.GET_RECIPES, payload: json })
        dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: false })
      }
    }
    getRecipes()
  }, [])
  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  )
}
