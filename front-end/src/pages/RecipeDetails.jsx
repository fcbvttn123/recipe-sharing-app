import { useParams } from "react-router-dom"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RecipeCard } from "../components/RecipeCard"
import { DisqusComments } from "../components/DisqusComments"

export function RecipeDetails() {
  const { recipes } = useRecipeContext()
  const { id } = useParams()
  let recipe = recipes ? recipes.find((e) => e._id == id) : null
  return (
    <div className="flex items-center justify-center pb-6">
      {recipe ? (
        <RecipeCard
          key={recipe._id}
          id={recipe._id}
          email={recipe.email}
          title={recipe.title}
          datePosted={recipe.createdAt}
          imgName={recipe.image}
          ingredients={recipe.ingredients}
          instructions={recipe.instruction}
          showDeleteIcon={true}
          showVerticalDotsIcon={true}
          likedBy={recipe.likedBy}
          likeNumber={recipe.likedBy.length}
        />
      ) : (
        <p>This recipe is not available anymore !</p>
      )}
      {/* {recipe && <DisqusComments post={recipe} />} */}
    </div>
  )
}
