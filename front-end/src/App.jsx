import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { PostRecipe } from "./pages/PostRecipe"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import AuthRequired from "./components/AuthRequired"
import { RecipeDetails } from "./pages/RecipeDetails"
import { EditRecipe } from "./pages/EditRecipe"
import { YourRecipes } from "./pages/YourRecipes"
import { ChatPage } from "./pages/ChatPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
          <Route path="/editRecipe/:id" element={<EditRecipe />} />
          <Route element={<AuthRequired />}>
            <Route path="/postRecipe" element={<PostRecipe />} />
          </Route>
          <Route element={<AuthRequired />}>
            <Route path="/yourRecipes" element={<YourRecipes />} />
          </Route>
        </Route>
        <Route element={<AuthRequired />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
