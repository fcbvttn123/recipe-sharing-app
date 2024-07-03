import { Link } from "react-router-dom"
import { RecipeCard } from "../components/RecipeCard"
import { useRecipeContext } from "../hooks/useRecipeContext"

export function Home() {
  const { recipes } = useRecipeContext()
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {recipes &&
        recipes.map((e) => (
          <Link to={`/recipeDetails/${e._id}`}>
            <RecipeCard
              key={e._id}
              id={e._id}
              email={e.email}
              title={e.title}
              datePosted={e.createdAt}
              imgName={e.image}
              ingredients={e.ingredients}
              instructions={e.instruction}
            />
          </Link>
        ))}
    </div>
  )
}
