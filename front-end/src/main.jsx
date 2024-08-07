import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RecipeContextProvider } from "./context/RecipeContext.jsx"
import { AuthContextProvider } from "./context/AuthContext.jsx"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === "production") disableReactDevTools()

export const RECIPE_ACTIONS = {
  GET_RECIPES: "GET_RECIPES",
  POST_RECIPE: "POST_RECIPE",
  DELETE_RECIPE: "DELETE_RECIPE",
  PATCH_RECIPE: "PATCH_RECIPE",
  SET_LOADING: "SET_LOADING",
  GET_FILTERED_RECIPES: "GET_FILTERED_RECIPES",
}

export const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
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
