import { useEffect, useState } from "react"
import { RecipeCard } from "../components/RecipeCard"

export function Home() {
  const [recipes, setRecipes] = useState(null)
  useEffect(() => {
    async function getRecipes() {
      let res = await fetch("/api/recipe")
      let json = await res.json()
      setRecipes(json)
    }
    getRecipes()
  }, [])
  return (
    <div>
      {recipes &&
        recipes.map((e, i) => (
          <RecipeCard
            key={i}
            email={e.email}
            title={e.title}
            datePosted={e.createdAt}
            imgName={e.image}
            ingredients={e.ingredients}
            instructions={e.instructions}
          />
        ))}
    </div>
  )
}
