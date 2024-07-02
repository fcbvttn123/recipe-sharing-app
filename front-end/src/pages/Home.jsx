import { RecipeCard } from "../components/RecipeCard"
import { useRecipeContext } from "../hooks/useRecipeContext"

export function Home() {
  const { recipes } = useRecipeContext()
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {recipes &&
        recipes.map((e, i) => (
          <RecipeCard
            key={i}
            email={e.email}
            title={e.title}
            datePosted={e.createdAt}
            imgName={e.image}
            ingredients={e.ingredients}
            instructions={e.instruction}
          />
        ))}
    </div>
  )
}
