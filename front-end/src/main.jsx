import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RecipeContextProvider } from "./context/RecipeContext.jsx"

export const RECIPE_ACTIONS = {
  GET_RECIPES: "GET_RECIPES",
  POST_RECIPE: "POST_RECIPE",
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </React.StrictMode>
)
