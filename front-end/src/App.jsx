import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { PostRecipe } from "./pages/PostRecipe"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/postRecipe" element={<PostRecipe />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
