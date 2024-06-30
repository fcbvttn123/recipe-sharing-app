import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RecipeContextProvider } from "./context/RecipeContext.jsx"
import { AuthContextProvider } from "./context/AuthContext.jsx"

export const RECIPE_ACTIONS = {
  GET_RECIPES: "GET_RECIPES",
  POST_RECIPE: "POST_RECIPE",
}

export const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipeContextProvider>
        <App />
      </RecipeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
