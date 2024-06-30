import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { PostRecipe } from "./pages/PostRecipe"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/postRecipe" element={<PostRecipe />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
